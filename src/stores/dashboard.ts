import { ref } from "vue";
import { defineStore } from "pinia";
import { documentApi, type DocumentFilterModel, type DocumentModel } from "@/entities/document";

export const useDashboardStore = defineStore("dashboard", () => {
    const documents = ref<DocumentModel[] | null>(null);

    const fetchDocumentsByUser = (user: string) => {
        documents.value = null;
        documentApi
            .getDocumentsByUser(user)
            .then((res) => {
                documents.value = res;
            })
            .catch((e) => console.log(e));
    };

    const fetchFiltredDocumentsByUser = (user: string, filter: DocumentFilterModel) => {
        if (!filter.search) return fetchDocumentsByUser(user);

        documents.value = null;
        documentApi
            .getFiltredDocumentsByUser({ user, filter })
            .then((res) => {
                documents.value = res;
            })
            .catch((e) => console.log(e));
    };

    return { documents, fetchDocumentsByUser, fetchFiltredDocumentsByUser };
});
