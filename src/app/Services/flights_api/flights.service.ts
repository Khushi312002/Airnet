import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Firestore,doc } from "@angular/fire/firestore";
import { getDoc } from "firebase/firestore";


@Injectable({
  providedIn: "root",
})
export class FlightsService {
  constructor(private http: HttpClient, private firestore:Firestore) {}

  authenticate(){
    return this.http.get("http://localhost:4000/authenticate");
  }


  async searchFlights() {
    try {
      const itineraryRef = doc(this.firestore, "Demo_Itinerary", "usa_itinerary");
      const itinerarySnap = await getDoc(itineraryRef);
  
      if (itinerarySnap.exists()) {
        const payload = {
          "origin": itinerarySnap.data().origin,
          "destination": itinerarySnap.data().cities[0].city,
          "adult": String(itinerarySnap.data().individuals.adult),
          "child": String(itinerarySnap.data().individuals.child),
          "infant": String(itinerarySnap.data().individuals.infant),
          "startDate": itinerarySnap.data().startDate,
          "tokenId": localStorage.getItem("authenticateToken"),
        };
  
        console.log(payload);
  
        return new Promise((resolve, reject) => {
          this.http.post("http://localhost:4000/searchFlights", payload).subscribe(
            (data) => {
              console.log(data);
              resolve(data);
            },
            (err) => {
              console.log("not able to fetch the details", err);
              reject("No data available");
            }
          );
        });
      } else {
        console.log("no data yet");
        return Promise.resolve("Error in searching flights");
      }
    } catch (err) {
      console.log("error aa rha hai", err);
      return Promise.reject("Error in searching flights");
    }
  }
  



}
