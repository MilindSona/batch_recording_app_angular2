import { Component, inject } from '@angular/core';
import { DashboardAdminService } from '../../core/services/dashboard-admin/dashboard-admin-service';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  imports: [NgFor, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  dashBoardService = inject(DashboardAdminService);
  selectedState: any = "";
  selectedCity: any = "";
  stateList: any[] = [{ stateId: 1, stateName: 'Andhra Pradesh' },
  { stateId: 2, stateName: 'Arunachal Pradesh' },
  { stateId: 3, stateName: 'Assam' }];
  http = inject(HttpClient);

  // Flat list of cities with state linkage
  cityList: any[] = [
    // Andhra Pradesh (stateId: 1)
    { cityId: 4, cityName: 'Vijayawada', stateId: 1 },
    { cityId: 5, cityName: 'Guntur', stateId: 1 },
    { cityId: 6, cityName: 'Nellore', stateId: 1 },
    { cityId: 7, cityName: 'Kakinada', stateId: 1 },
    { cityId: 8, cityName: 'Rajahmundry', stateId: 1 },
    { cityId: 9, cityName: 'Tirupati', stateId: 1 },
    { cityId: 10, cityName: 'Anantapur', stateId: 1 },
    { cityId: 11, cityName: 'Vizianagaram', stateId: 1 },
    { cityId: 12, cityName: 'Srikakulam', stateId: 1 },
    // Arunachal Pradesh (stateId: 2)
    { cityId: 13, cityName: 'Tawang', stateId: 2 },
    { cityId: 14, cityName: 'Naharlagun', stateId: 2 },
    { cityId: 15, cityName: 'Pasighat', stateId: 2 },
    { cityId: 16, cityName: 'Ziro', stateId: 2 },
    { cityId: 17, cityName: 'Roing', stateId: 2 },
    { cityId: 18, cityName: 'Tezu', stateId: 2 },
    { cityId: 19, cityName: 'Bomdila', stateId: 2 },
    // Assam (stateId: 3)
    { cityId: 20, cityName: 'Guwahati', stateId: 3 },
    { cityId: 21, cityName: 'Jorhat', stateId: 3 },
    { cityId: 22, cityName: 'Silchar', stateId: 3 },
    { cityId: 23, cityName: 'Dibrugarh', stateId: 3 },
    { cityId: 24, cityName: 'Nagaon', stateId: 3 },
    { cityId: 25, cityName: 'Tezpur', stateId: 3 },
    { cityId: 26, cityName: 'Sivasagar', stateId: 3 },
    { cityId: 27, cityName: 'Dhubri', stateId: 3 },
    { cityId: 28, cityName: 'Goalpara', stateId: 3 },
  ];

  filteredCities: any[] = [];

  onChangeState(event: any): void {
    const stateId = Number(this.selectedState);
    this.filteredCities = this.cityList.filter(city => city.stateId === stateId);
    this.selectedCity = "";
    console.log('Selected State ID:', stateId, 'Filtered Cities:', this.filteredCities);
  }
  ngOnInit(): void {
    this.loadAdminDashboard();
  }
  loadAdminDashboard(): void {
    this.dashBoardService.getAdminDashboard().subscribe((response) => {
      console.log('Admin Dashboard Data:', response);
    });
  }
  selectedFile!: File;

onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
}

uploadFile() {
  const formData = new FormData();
  formData.append('file', this.selectedFile);

  this.http.post('https://localhost:5059/api/upload', formData)
    .subscribe(res => {
      console.log('Upload success', res);
    });
}
}
