export type IAddvertisementPostion =
    "Home Page - Upper Left" |
    "Home Page - Upper Right" |
    "Home Page - Upper Center" |
    "Home Page - Bottom Left" |
    "Home Page - Bottom Right Up" |
    "Home Page - Bottom Right Down" |
    "Category Page - Up" |
    "Category Page - Down" |
    "Service Page - Up" |
    "Service Page - Down"
    
export interface IAdvertisement {
    id: number
    position: IAddvertisementPostion
    type: "image",
    url: string,
    created_at: string,
    updated_at: string
}