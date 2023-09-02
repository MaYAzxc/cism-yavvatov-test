import { ref } from "vue";
import { defineStore } from "pinia";
import { documentApi, type DocumentFilterModel, type DocumentModel, type DTODocumentModel } from "@/entities/document";

interface ImagesBlob {
    [key: number]: Blob | null;
}

export const useDashboardStore = defineStore("dashboard", () => {
    const documents = ref<DocumentModel[] | null>(null);

    const getDocumentsWithImgData = async (docs: DTODocumentModel[]) => {
        let imagesBlob: ImagesBlob = {};

        for (let i = 0; i < docs.length; i++) {
            const d = docs[i];
            imagesBlob[d.id] = d.image ? await documentApi.getImageDocumentBlob(d.image) : null;
        }

        return imagesBlob;
    };

    const getUnionWithImagesDocuments = (
        dtoDocuments: DTODocumentModel[],
        imagesBlob?: ImagesBlob
    ): DocumentModel[] => {
        return dtoDocuments.map((dtoDocument, i) => ({
            id: dtoDocument.id,
            name: dtoDocument.name,
            blob: imagesBlob ? imagesBlob[i] : null,
            description: dtoDocument.description,
        }));
    };

    const fetchDocumentsByUser = (user: string) => {
        documents.value = null;
        documentApi
            .getDocumentsByUser(user)
            .then(async (dtoDocuments) => {
                getDocumentsWithImgData(dtoDocuments)
                    .then((imagesBlob) => {
                        documents.value = getUnionWithImagesDocuments(dtoDocuments, imagesBlob);
                    })
                    .catch((e) => {
                        documents.value = getUnionWithImagesDocuments(dtoDocuments);
                        console.log(e);
                    });
            })
            .catch((e) => {
                alert("Ошибка запроса");
                console.log(e);
            });
    };

    const fetchFiltredDocumentsByUser = (user: string, filter: DocumentFilterModel) => {
        if (!filter.search) return fetchDocumentsByUser(user);

        documents.value = null;
        documentApi
            .getFiltredDocumentsByUser({ user, filter })
            .then((dtoDocuments) => {
                getDocumentsWithImgData(dtoDocuments).then((imagesBlob) => {
                    documents.value = getUnionWithImagesDocuments(dtoDocuments, imagesBlob);
                });
            })
            .catch((e) => {
                alert("Ошибка запроса");
                console.log(e);
            });
    };

    const deleteDocumentById = (id: number) => {
        if (documents.value) documents.value = documents.value.filter((d) => d.id !== id);
    };

    return { documents, fetchDocumentsByUser, fetchFiltredDocumentsByUser, deleteDocumentById };
});
