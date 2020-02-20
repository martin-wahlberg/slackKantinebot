interface weekMenuLocations {
  huset?: Record<string, string>;
  galleriet?: Record<string, string>;
}

interface valueString {
  value: string;
}

interface HusetInputElement {
  huset: valueString;
}

interface GallerietInputElement {
  galleriet: valueString;
}

interface mappedJSONInput {
  huset?: valueString;
  galleriet?: valueString;
}

interface JSONInputState {
  values: Record<string, HusetInputElement | GallerietInputElement>;
}

interface User {
  addedBy: string;
  userName: string;
}
