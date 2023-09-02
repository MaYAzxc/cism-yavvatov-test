import { http } from "@/shared/api";
import type { DocumentFilterModel, DTODocumentModel } from "../model";

const routesConfig = http.createRoutesConfig({
    getDocumentsByUser: http.createRoute<string, DTODocumentModel[]>((user) => ({
        url: `/${user}/docs`,
    })),
    getFiltredDocumentsByUser: http.createRoute<{ user: string; filter: DocumentFilterModel }, DTODocumentModel[]>(
        ({ user, filter }) => ({
            url: `/${user}/docs`,
            params: {
                search: filter.search,
            },
        })
    ),
    getImageDocumentBlob: http.createRoute<string, Blob>((imgUrl) => ({
        url: imgUrl,
        responseType: "blob",
    })),
});

export const documentApi = routesConfig.build();
