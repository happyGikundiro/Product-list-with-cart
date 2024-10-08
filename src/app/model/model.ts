export interface Products{
    image:Image;
    name: string;
    category: string;
    price: number;
    quantity?: number;
}

interface Image {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
}