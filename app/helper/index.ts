export const getGeneratedID = (row: any) => {
    return new Date(row.created_at).toLocaleString('en-BD', { year: '2-digit', month: '2-digit' }).split('/').reverse().join('') + row.id
}

export const getFileUrl = (url: string): string => {   
    return useRuntimeConfig().public.imageUrl + '/' + url.replaceAll('public', 'storage')
}

export const getUrl = (data: any) => {
    if(data instanceof File) return URL.createObjectURL(data)
    else return getFileUrl(getFileUrl(data))
}