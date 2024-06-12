
const DeleteObjectFromStorage = async (StoreId: string) => {
    await chrome.storage.sync.remove([StoreId]);
    console.log(`Deleted ${StoreId} from storage`);
}

export default DeleteObjectFromStorage;