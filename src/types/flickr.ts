export interface FlickrPhoto {
  title: string;
  coverUrl: string;
  id: string;
  description: string;
}

export interface FlickrPhotoset {
  photo: FlickrPhoto[];
}

export interface IFlickrResponse {
  photoset: {
    photo: any[];
  };
}

export interface IFlickerHookReturn {
  flickr: FlickrPhotoset;
  isLoading: boolean;
  error: any;
}

export type FlickrParams = {
  method: string;
  api_key: string;
  photoset_id: string;
  format: string;
  nojsoncallback: number;
  extras: string;
  params?: Record<string, string>;
};
