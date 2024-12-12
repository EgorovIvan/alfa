import axios from "axios";

export type SendRequest = (targetUri: string) => Promise<any>;

export const sendRequest: SendRequest = async (targetUri) => {
    try {
        const response = await axios.get(targetUri);
        return response.data;
    } catch (error) {
        console.error("Error while making request:", error);
        throw error;
    }
};