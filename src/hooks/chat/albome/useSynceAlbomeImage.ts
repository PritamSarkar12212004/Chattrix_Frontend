import * as MediaLibrary from "expo-media-library";
const useSynceAlbomeImage = () => {
  const fetchPhotos = async ({
    setLoading,
    hasMore,
    loading,
    after,
    setPhotos,
    setAfter,
    setHasMore,
  }: any) => {
    if (loading || !hasMore) return;
    setLoading(true);

    const result = await MediaLibrary.getAssetsAsync({
      mediaType: ["photo"],
      first: 50, // number of photos per batch
      after: after,
    });

    setPhotos((prevPhotos) => [...prevPhotos, ...result.assets]);
    setAfter(result.endCursor);
    setHasMore(result.hasNextPage);
    setLoading(false);
  };
  return { fetchPhotos };
};

export default useSynceAlbomeImage;
