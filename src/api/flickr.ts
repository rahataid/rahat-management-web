import FlickrService from '@services/flickr';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { IFlickerHookReturn } from 'src/types/flickr';

export function useFlickr(params?: any): IFlickerHookReturn {
  const { data, isLoading, error } = useQuery(['flickr'], async () => {
    const response = await FlickrService.get({
      ...params,
    });
    return response;
  });

  const flickr = useMemo(() => {
    if (!data || !data?.data || !data?.data?.photoset) {
      return null;
    }

    const photoset = data?.data?.photoset;
    const photos = photoset.photo.map((item: any) => ({
      title: item.title,
      coverUrl: `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg`,
      id: item.id,
      description: '',
    }));

    return {
      ...photoset,
      photo: photos,
    };
  }, [data]);

  return {
    flickr,
    isLoading,
    error,
  };
}
