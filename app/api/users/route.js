//supported http request methods: GET, POST, PUT, DELET, PATCH, OPTIONS, HEAD

export async function GET(request) {
    const users = [
        { id: 1, name: "Emil", wins: 0, losses: 0, CAThletics: [] },
    ]

    return new Response(JSON.stringify(users))
}