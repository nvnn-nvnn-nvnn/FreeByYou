import { CategoryId } from "../listings.data";


const BACKEND_URL = process.env.EXPO_PUBLIC_API_URL;


export async function fetchListings(params: {

    category: CategoryId;
    page: number;
    zipCode?: string;

}): Promise<Page<Listing>>{
    const res = await fetch(`${BACKEND_URL}/listings?` + new URLSearchParams({
        category: params.category,
        page: String(params.page),
        zipCode: params.zipCode || '10001',
    }))

    if (!res) throw new Error('Failed to fetch listings');
    return res.json()

}



