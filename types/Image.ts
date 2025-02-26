export type Image = {
    caption?: string,
    sizes: ImageSize[];
}

export type ImageSize = {
    width: number,
    height: number,
    url: string
}