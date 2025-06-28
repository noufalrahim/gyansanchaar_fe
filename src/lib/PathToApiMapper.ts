import { ROUTE_URLS } from "@/constants";

export default function PathToApiMapper(
    path: string,
    searchParam: string,
    date?: Date,
    searchTerm?: string,
    orderBy?: string,
    orderDir?: string,
): string {
    const params = new URLSearchParams();

    if (date) {
        params.append("createdAt[gte]", date.toISOString());
        const endOfToday = new Date();
        endOfToday.setHours(23, 59, 59, 999);
        params.append("createdAt[lte]", endOfToday.toISOString());
    }

    if (searchTerm && searchTerm.trim() !== '') {
        params.append(`${searchParam}[like]`, searchTerm);
    }

    if(orderBy != '' && orderBy) {
        params.append('_order_by', orderBy);
    }

    if(orderDir != '' && orderDir) {
        params.append('_order_dir', orderDir);
    }

    switch (path) {
        case ROUTE_URLS.COLLEGES:
            return `/colleges/fields/many?${params.toString()}`;
        default:
            return '';
    }
}
