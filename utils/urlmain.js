export let clientUrl = ``;

export const getURL = (req)=> {
    const originalURL = req.originalURL;
    clientUrl = originalURL;
    return
}