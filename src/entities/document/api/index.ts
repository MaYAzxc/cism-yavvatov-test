import { http } from "@/shared/api";
import type { DocumentFilterModel, DocumentModel } from "../model";

const routesConfig = http.createRoutesConfig({
    getDocumentsByUser: http.createRoute<string, DocumentModel[]>((user) => ({
        url: `/${user}/docs`,
    })),
    getFiltredDocumentsByUser: http.createRoute<{ user: string; filter: DocumentFilterModel }, DocumentModel[]>(
        ({ user, filter }) => ({
            url: `/${user}/docs`,
            params: {
                search: filter.search,
            },
        })
    ),
});

export const documentApi = routesConfig.build();
