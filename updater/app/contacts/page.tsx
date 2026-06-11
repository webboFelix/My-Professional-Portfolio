"use client";

import { useEffect, useMemo, useState } from "react";
import api from "@/lib/api";
import { Mail, Trash2, Check } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";
import { SearchInput } from "@/components/ui/SearchInput";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/providers/ToastProvider";
import { useStats } from "@/components/providers/StatsProvider";
import { useDeleteConfirm } from "@/hooks/useDeleteConfirm";

interface Contact {
  $id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  read: boolean;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { toast } = useToast();
  const { refresh } = useStats();
  const { target, deleting, setDeleting, open, close } =
    useDeleteConfirm<Contact>();

  const fetchContacts = async () => {
    try {
      const res = await api.get("/contacts");
      setContacts(res.data);
    } catch {
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return contacts;
    return contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.message.toLowerCase().includes(q),
    );
  }, [contacts, search]);

  const unread = contacts.filter((c) => !c.read).length;

  const markAsRead = async (id: string) => {
    try {
      await api.put(`/contacts/${id}/read`);
      toast("Marked as read");
      fetchContacts();
      refresh();
    } catch {
      toast("Failed to update message", "error");
    }
  };

  const handleDelete = async () => {
    if (!target) return;
    setDeleting(true);
    try {
      await api.delete(`/contacts/${target.$id}`);
      toast("Message deleted");
      close();
      fetchContacts();
      refresh();
    } catch {
      toast("Failed to delete message", "error");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Messages"
        description={
          unread > 0
            ? `${unread} unread message${unread > 1 ? "s" : ""}`
            : "Contact form submissions"
        }
      />

      {!loading && contacts.length > 0 && (
        <div className="mb-6">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search messages..."
          />
        </div>
      )}

      {loading ? (
        <LoadingSkeleton rows={3} />
      ) : contacts.length === 0 ? (
        <EmptyState
          title="No messages yet"
          description="Messages from your portfolio contact form will appear here"
        />
      ) : filtered.length === 0 ? (
        <EmptyState title="No matches" description={`Nothing found for "${search}"`} />
      ) : (
        <div className="space-y-3">
          {filtered.map((contact) => (
            <div
              key={contact.$id}
              className={`rounded-xl border p-5 transition ${
                contact.read
                  ? "border-white/5 bg-white/[0.02]"
                  : "border-cyan-500/20 bg-cyan-500/[0.03]"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5">
                      <Mail size={16} className="text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">
                        {contact.name}
                      </h3>
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-sm text-cyan-400 hover:underline"
                      >
                        {contact.email}
                      </a>
                    </div>
                    {!contact.read && <Badge variant="info">New</Badge>}
                  </div>
                  <p className="mt-1 text-xs text-gray-600">
                    {new Date(contact.date).toLocaleString()}
                  </p>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-gray-300">
                    {contact.message}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  {!contact.read && (
                    <Button
                      variant="secondary"
                      onClick={() => markAsRead(contact.$id)}
                      className="!px-3 !py-1.5 text-xs"
                    >
                      <Check size={14} />
                      Mark Read
                    </Button>
                  )}
                  <button
                    onClick={() => open(contact)}
                    className="rounded-lg p-2 text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!target}
        title="Delete message?"
        description={`Message from "${target?.name}" will be permanently removed.`}
        onConfirm={handleDelete}
        onCancel={close}
        loading={deleting}
      />
    </div>
  );
}
