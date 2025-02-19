import { Contact } from "@/components/contacts/ContactMain";
import { useEffect, useState } from "react";

export const useContacts = () => {
    const [loading, setLoading] = useState(true);
    const [contacts, setContacts] = useState<Contact[]>([]);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const res = await fetch("/api/contacts/fetch-contacts");
                const data = await res.json();

                if (data.success) {
                    setContacts(data.contacts);
                }
            } catch (error) {
                console.error("Error fetching contacts:", error);
            } finally {
                setLoading(false); // Ensure loading state updates after fetch
            }
        };

        fetchContacts();
    }, []);

    return { contacts, setContacts, loading };
};
