import {AdEntity} from "../types";
import {ValidationError} from "../utils/error";
import {pool, uuid} from "../utils/db";
import {FieldPacket} from "mysql2";

interface NewAdEntity extends Omit<AdEntity, "id"> {
    id?: string;
}

type AdRecordResults = [AdEntity[], FieldPacket[]];

export class AdRecord implements AdEntity {
    public id: string;
    public name: string;
    public description: string;
    public price: number;
    public url: string;
    public lon: number;
    public lat: number;


    constructor(obj: NewAdEntity) {
        if(!obj.name || obj.name.length < 1 || obj.name.length > 100) {
            throw new ValidationError("Nazwa ogloszenia nie może być pusta, ani przekraczać 100 znaków");
        }

        if(obj.description.length > 1000) {
            throw new ValidationError("Treść ogłoszenia nie może przekraczać 1000 znaków");
        }

        if(obj.price < 0 || obj.price > 9999999) {
            throw new ValidationError("Cena nie może być mniejsza niż 0 lub większa niż 9 999 999");
        }


        if(!obj.url || obj.url.length > 100) {
            throw new ValidationError("Link nie może być pusty, ani przekraczać 100 znaków");
        }

        if(typeof obj.lat !== "number" || typeof obj.lon !== "number") {
            throw new ValidationError("Nie można zlokalizować ogłoszenia")
        }

        // this.id = obj.id;
        // this.name = obj.name;
        // this.description = obj.description;
        // this.price = obj.price;
        // this.url = obj.url;
        // this.lon = obj.lon;
        // this.lat = obj.lat;
        Object.assign(this, obj);

    }

    async insertAd(): Promise<string> {
        if(!this.id) {
            this.id = uuid();
        }
        await pool.execute("INSERT INTO `ads` VALUES(:id, :name, :description, :price, :url, :lon, :lat)", {
            id: this.id,
            name: this.name,
            description: this.description,
            price: this.price,
            url: this.url,
            lon: this.lon,
            lat: this.lat,

        })

        return this.id;
    };

    static async findOne(id: string): Promise<AdRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `ads` WHERE id = :id", {
            id,
        }) as AdRecordResults;

        return results.length === 0 ? null : new AdRecord(results[0])
    };

    static async findAll(): Promise<AdRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `ads` ORDER BY `name` ASC") as AdRecordResults;
        return results.map(obj => new AdRecord(obj));
    };

    static async search(query: string): Promise<AdRecord[] | null> {
        const [results] = await pool.execute("SELECT * FROM `ads` ORDER BY `name` ASC") as AdRecordResults;
        const found = results.filter((oneResult) => oneResult.name.toLowerCase().includes(query.toLowerCase()));
        return found.length === 0 ? null : found as AdRecord[]
    };

}
