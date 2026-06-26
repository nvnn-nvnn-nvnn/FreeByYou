

export async function zipToCoordinates(

    zipCode: string,
    country: string = 'US'


): Promise<{lat: number, lon: number, displayName: string} | null> {


    try {

        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        `${zipCode}, ${country}`
      )}&limit=1`,
      {headers : {'User-Agent': 'FreeByYou 1.0'}}
    );

    const data = await res.json() as Array<{ lat: string; lon: string; display_name: string }>;
    if (data && data.length > 0 ){
        return {
            lat: parseFloat(data[0].lat),
            lon: parseFloat(data[0].lon),
            displayName: data[0].display_name,
        };
    }
    } catch (e) {
        console.error('Geocoding failed:', e);
        return null
    }
}
 


