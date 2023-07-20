import FlickrService from '@services/flickr';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { IFlickerHookReturn, IFlickrResponse } from 'src/types/flickr';

interface IFlickrParams {
  [key: string]: any;
}

export function useFlickr(params?: IFlickrParams): IFlickerHookReturn {
  const { data, isLoading, error } = useQuery<IFlickrResponse>(['flickr'], async () => {
    const response = await FlickrService.get(params);
    return response.data;
  });

  const flickr = useMemo(() => {
    const photos =
      data?.photoset.photo.map((item) => ({
        title: item.title,
        coverUrl: `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg`,
        id: item.id,
        description: '',
      })) || [];

    return {
      photo: photos,
    };
  }, [data]);

  return {
    flickr,
    isLoading,
    error,
  };
}
