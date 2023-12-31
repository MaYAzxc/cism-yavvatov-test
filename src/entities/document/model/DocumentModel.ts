export default interface DocumentModel {
    id: number;
    name: string;
    blob: Blob | null;
    description: string;
}
