

export interface Request {
    offset?: Number;
    limit?: Number;
    name?: String;
    retailerId?: String;
    excludeExpired?: Boolean;
    maxDistance?: Number;
    sort?: String;
}

interface QueryItem {
    offset: Number;
    limit: Number;
}

interface ImageItem {
    xs: String;
    sm: String;
    md: String;
    lg: String;
}

interface RetailerItem {
    id: String;
    name: String;
    distance: Number;
    priority: Number;
    images: ImageItem;
}

interface LeafletItem {
    id: String;
    name: String;
    expTimestamp: Number;
    retailer: RetailerItem;
}

export interface Response {
    query: QueryItem;
    current: Number;
    total: Number;
    count: Number;
    leaflets: {
        [key: string]: LeafletItem
    };
    error: String
}



