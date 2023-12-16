  import { Component, OnInit } from '@angular/core';
import { FlightsService } from 'src/app/Services/flights_api/flights.service';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.scss']
})
export class ItineraryComponent implements OnInit {

   airlineName:string;
   departureTime:string;
   originCity:string;
   duration:string;
   arrivalTime:string;
   destinationCity:string;
   fare:string;



  constructor(private flightApiService:FlightsService) { }

  ngOnInit(): void {


  }

  authenticateFlightApi(){
    this.flightApiService.authenticate().subscribe(
      (data:{
        token:string
      })=>{
        console.log(data.token);
        localStorage.setItem("authenticateToken",data.token)
      },
      err=>{
        console.log(err,"error aa gya")
      }
    )
   
  }

  async searchFlights() {
    // try {
    //   const data:any = await this.flightApiService.searchFlights();
      
    //   console.log(data)

    //   this.airlineName=data.airline.AirlineName;
    //   this.departureTime=data.origin.DepTime;
    //   this.originCity=data.origin.
    
    // } catch (err) {
    //   console.log(err);
    // }
  }


}
