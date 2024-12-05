import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const GetApiCustomerRoutes = async (url: string, Authorization?: string) => {
    try {
        const response = await axios.get(url, Authorization ? { headers: { Authorization: `Bearer ${Authorization}` } } : {});
        if (response.status === 200) {
            return response.data;
        } else if (response.status === 401) {
            return response;
        }
    } catch (error) {
        console.error('Error:', error);
        return error;
    }
}

export const PostApiCustomerRoutes = async <T>(url: string, data: T, AuthorizationToken?: string) => {
    try {
        const response = await axios.post(url, data, AuthorizationToken ? { headers: { Authorization: `Bearer ${AuthorizationToken}` } } : {});
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        return error;
    }
}

export const PutApiCustomerRoutes = async <T>(url: string, data: T, AuthorizationToken?: string) => {
    try {
        const response = await axios.put(url, data, AuthorizationToken ? { headers: { Authorization: `Bearer ${AuthorizationToken}` } } : {});
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        return error;
    }
}

export const DeleteApiCustomerRoutes = async <T>(url: string, data: T, AuthorizationToken?: string) => {
    try {
        const response = await axios.delete(url, {
            data: data ? data : {},
            headers: { Authorization: `Bearer ${AuthorizationToken}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        return error;
    }
}

export const CustomUseQuery = <T>(QueryKey: T[], url: string, token: string) => {
    const { data, isLoading } = useQuery({
        queryKey: QueryKey,
        queryFn: () => GetApiCustomerRoutes(url, token),
    });
    return { data, isLoading };
}