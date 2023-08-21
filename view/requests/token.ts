import instance from "@/requests/instance";

export const getToken = async () => {
    const {data} = await instance.get<string>(
        '/local/token/view'
    )
    console.log('getToken', data)
    return data
}
