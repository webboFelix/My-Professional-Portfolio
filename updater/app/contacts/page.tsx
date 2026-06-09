"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";

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

  const fetchContacts = async () => {
    const res = await api.get("/contacts");
    setContacts(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const markAsRead = async (id: string) => {
    await api.put(`/contacts/${id}/read`);
    fetchContacts();
  };

  const deleteContact = async (id: string) => {
    if (confirm("Delete this message?")) {
      await api.delete(`/contacts/${id}`);
      fetchContacts();
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Contact Messages</h1>
      {contacts.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact) => (
            <div
              key={contact.$id}
              className={`border rounded p-4 ${contact.read ? "border-gray-700" : "border-blue-500"}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">
                    {contact.name} ({contact.email})
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {new Date(contact.date).toLocaleString()}
                  </p>
                  <p className="mt-2 whitespace-pre-wrap">{contact.message}</p>
                </div>
                <div className="space-x-2">
                  {!contact.read && (
                    <button
                      onClick={() => markAsRead(contact.$id)}
                      className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Mark Read
                    </button>
                  )}
                  <button
                    onClick={() => deleteContact(contact.$id)}
                    className="text-red-400 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
