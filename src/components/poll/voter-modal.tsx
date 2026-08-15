"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { User, Mail, CheckCircle, Loader2 } from "lucide-react";
import { useLang } from "@/lib/i18n";

interface VoterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCount: number;
  isSubmitting: boolean;
  onSubmit: (data: { name: string; email: string }) => void;
}

export function VoterModal({
  open,
  onOpenChange,
  selectedCount,
  isSubmitting,
  onSubmit,
}: VoterModalProps) {
  const { t } = useLang();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  // Load saved voter details from previous session if available
  useEffect(() => {
    if (typeof window !== "undefined" && open) {
      const savedName = localStorage.getItem("voter_name") || "";
      const savedEmail = localStorage.getItem("voter_email") || "";
      if (savedName) setName(savedName);
      if (savedEmail) setEmail(savedEmail);
      setNameError("");
      setEmailError("");
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    const trimmedName = name.trim();
    if (!trimmedName || trimmedName.length < 2) {
      setNameError(t.modalVoterNameError);
      hasError = true;
    } else {
      setNameError("");
    }

    const trimmedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      setEmailError(t.modalVoterEmailError);
      hasError = true;
    } else {
      setEmailError("");
    }

    if (hasError) return;

    if (typeof window !== "undefined") {
      localStorage.setItem("voter_name", trimmedName);
      localStorage.setItem("voter_email", trimmedEmail);
    }

    onSubmit({ name: trimmedName, email: trimmedEmail });
  };

  return (
    <Dialog open={open} onOpenChange={(val) => !isSubmitting && onOpenChange(val)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="space-y-1.5 text-left pr-8">
          <div className="flex items-center justify-between gap-2.5">
            <DialogTitle className="text-lg sm:text-xl font-bold tracking-tight">
              {t.modalVoterTitle}
            </DialogTitle>
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400 shrink-0">
              <CheckCircle className="size-3 text-emerald-500" />
              {t.modalVoterSelected(selectedCount)}
            </span>
          </div>
          <DialogDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {t.modalVoterDesc}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-1">
          <div className="space-y-1.5">
            <Label htmlFor="voter-name" className="text-sm font-medium">
              {t.modalVoterNameLabel} <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="voter-name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (nameError) setNameError("");
                }}
                placeholder={t.modalVoterNamePlaceholder}
                className={`pl-9 ${nameError ? "border-destructive focus-visible:ring-destructive" : ""}`}
                disabled={isSubmitting}
                autoFocus
              />
            </div>
            {nameError && (
              <p className="text-xs text-destructive">{nameError}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="voter-email" className="text-sm font-medium">
              {t.modalVoterEmailLabel} <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="voter-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError("");
                }}
                placeholder={t.modalVoterEmailPlaceholder}
                className={`pl-9 ${emailError ? "border-destructive focus-visible:ring-destructive" : ""}`}
                disabled={isSubmitting}
              />
            </div>
            {emailError && (
              <p className="text-xs text-destructive">{emailError}</p>
            )}
          </div>

          <div className="rounded-lg bg-muted/50 p-2.5 text-xs text-muted-foreground">
            {t.modalVoterPrivacyNote}
          </div>

          <DialogFooter className="flex flex-row items-center justify-end gap-3 pt-3 sm:space-x-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
              className="px-4"
            >
              {t.modalVoterCancel}
            </Button>
            <Button type="submit" disabled={isSubmitting} className="min-w-[100px] gap-2 px-5 font-semibold">
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  {t.submitting}
                </>
              ) : (
                t.modalVoterSubmit
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
