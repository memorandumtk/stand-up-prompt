
const DeleteObjectFromStorage = async (StoreId: string) => {
    await chrome.storage.sync.remove([StoreId]);
}

export default DeleteObjectFromStorage;