import { ImageSize, Image } from "../types/Image"

export const mockImageSize: ImageSize = {
    width: 80,
    height: 80,
    url: "small_url"
}

export const largeMockImageSize: ImageSize = {
    width: 800,
    height: 800,
    url: "large_url"
}

export const mockImage: Image = {
    caption: "test caption",
    sizes: [mockImageSize, largeMockImageSize]
}