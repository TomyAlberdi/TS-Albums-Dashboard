export interface Artist {
  url: string;
  name: string;
  mbid: string;
}

export interface Image {
  size: string;
  "#text": string;
}

export interface PartialAlbum {
  mbid: string;
  url: string;
  playcount: string;
  "@attr": {
    rank: string;
  };
  name: string;
  artist: Artist;
  image: Image[];
}

export interface Tag {
  url: string;
  name: string;
}

export interface Track {
  streamable: {
    fulltrack: string;
    "#text": string;
  };
  duration: number;
  url: string;
  name: string;
  "@attr": {
    rank: number;
  };
  artist: Artist;
}

export interface CompleteAlbum {
  images: Image[];
  mbid: string;
  name: string;
  artist: string;
    listeners: string;
  playcount: string;
  url: string;
  tracks: {
    track: Track[];
  }
}

export interface TimePeriod {
  name: string;
  value: string;
  active: boolean;
}

export interface ReturnData {
  loading: boolean;
  data: PartialAlbum[] | CompleteAlbum | null;
}