"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import Toast from "./Toast";

const PlanContext = createContext(null);
const PLAN_KEY = "fitlog_plan";
const SAVED_KEY = "fitlog_saved";
const PLAN_CAP = 5;

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedPlan = JSON.parse(localStorage.getItem(PLAN_KEY)) || [];
      const storedSaved = JSON.parse(localStorage.getItem(SAVED_KEY)) || [];
      setPlan(storedPlan);
      setSaved(storedSaved);
    } catch (e) {}

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
  }, [plan, hydrated]);

  useEffect(() => {
    if (hydrated) localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  }, [saved, hydrated]);

  const showToast = useCallback((message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2500);
  }, []);

  const addToPlan = useCallback(
    (workout) => {
      if (plan.some((w) => w.id === workout.id)) {
        showToast("Already in today's plan");
        return;
      }
      if (plan.length >= PLAN_CAP) {
        showToast("Today's plan is full (5 lifts max)");
        return;
      }
      setPlan((prev) => [...prev, { ...workout, done: false }]);
      showToast("Added to today's plan");
    },
    [plan, showToast]
  );

  const addToSaved = useCallback(
    (workout) => {
      if (saved.some((w) => w.id === workout.id)) {
        showToast("Already saved");
        return;
      }
      setSaved((prev) => [...prev, workout]);
      showToast("Saved for later");
    },
    [saved, showToast]
  );

  const removeFromPlan = useCallback(
    (id) => {
      setPlan((prev) => prev.filter((w) => w.id !== id));
      showToast("Removed from plan");
    },
    [showToast]
  );

  const removeFromSaved = useCallback(
    (id) => {
      setSaved((prev) => prev.filter((w) => w.id !== id));
      showToast("Removed from saved");
    },
    [showToast]
  );

  const markAsDone = useCallback(
    (id) => {
      setPlan((prev) => prev.map((w) => (w.id === id ? { ...w, done: !w.done } : w)));
      showToast("Marked as done");
    },
    [showToast]
  );

  const value = {
    plan,
    saved,
    addToPlan,
    addToSaved,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
    showToast,
    planCap: PLAN_CAP,
    hydrated,
  };

  return (
    <PlanContext.Provider value={value}>
      {children}
      <Toast toasts={toasts} />
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within a PlanProvider");
  return ctx;
}
