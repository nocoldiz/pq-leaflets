

export interface LeafletsRequest {
    offset?: number;
    limit?: number;
    name: string;
    retailerId?: string;
    excludeExpired: number;
    maxDistance: number;
    sort?: string;
}

interface QueryItem {
    offset: number;
    limit: number;
}

export interface Retailer {
    id: string;
    name: string;
}


interface ImageItem {
    xs: string;
    sm: string;
    md: string;
    lg: string;
}

interface RetailerItem {
    id: string;
    name: string;
    distance: number;
    priority: number;
    images: ImageItem;
}

export interface LeafletItem {
    id: string;
    name: string;
    expTimestamp: number;
    retailer: RetailerItem;
}

export interface LeafletsResponse {
    data: {
        query: QueryItem;
        current: number;
        total: number;
        count: number;
        leaflets: Array<LeafletItem>
        error: string
    }
}



