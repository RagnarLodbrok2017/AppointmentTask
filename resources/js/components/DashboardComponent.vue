<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">

                    <h4 class="card-title">Consultations</h4>
                    <div class="row">
                        <div class="col-9">
                            <div class="form-check">
                            <input class="form-check-input" type="radio" v-model="Checked" value="patients">
                            <label class="form-check-label" for="flexRadioDefault1">
                                Tous Les Patients
                            </label>
                            </div>
                            <div class="form-check">
                            <input class="form-check-input" type="radio" v-model="Checked" value="doctors" checked>
                            <label class="form-check-label" for="flexRadioDefault2">
                                Tous Les Medecins
                            </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" v-model="Checked" value="appointments">
                                <label class="form-check-label" for="flexRadioDefault3">
                                    Tous Les RDVs
                                </label>
                            </div>
                        </div>
                        <div class="col-3">
                            <!-- Button trigger modal -->
                            <button class="btn btn-primary">VALIDER</button>
                        </div>
                    </div>
                    <p class="card-title-desc">

                    </p>

                    <table v-if="Checked == 'appointments'" id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                        <thead>
                        <tr>
                            <th>Numero</th>
                            <th>Date</th>
                            <th>Heure</th>
                            <th>Medecin</th>
                            <th>Patient</th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr v-for="(appointment, index) in appointments" :key="appointment.id">
                            <td> {{ appointment.number }}</td>
                            <td> {{ appointment.date }}</td>
                            <td> {{ appointment.time }}</td>
                            <td> {{ appointment.doctor_code }}</td>
                            <td> {{ appointment.patient_code }}</td>
                        </tr>
                        </tbody>
                    </table>
                    <table v-else-if="Checked == 'doctors'" id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                        <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Code</th>
                            <th>Telephone</th>
                            <th>Date</th>
                            <th>Specialite</th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr v-for="(doctor, index) in doctors" :key="doctor.id">
                            <td> {{ doctor.name }}</td>
                            <td> {{ doctor.code }}</td>
                            <td> {{ doctor.telephone }}</td>
                            <td> {{ doctor.date_hired }}</td>
                            <td> {{ doctor.speciality }}</td>

                        </tr>
                        </tbody>
                    </table>
                    <table v-else-if="Checked == 'patients'" id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                        <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Code</th>
                            <th>Date Naissance</th>
                            <th>Sexe</th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr v-for="(patient, index) in patients" :key="patient.id">
                            <td> {{ patient.name }}</td>
                            <td> {{ patient.code }}</td>
                            <td> {{ patient.date_of_birth }}</td>
                            <td>
                                <p class="font-monospace" v-if="patient.sex === 'male'">M</p>
                                <p class="font-monospace" v-else-if="patient.sex === 'female'">F</p>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>


import swalHelper from "./../Helpers/SwalHelper";
export default {
    name: "AppointmentComponent",

    created() {
        this.fetchDoctors();
        this.fetchPatients();
        this.fetchAppointments();
    },
    components:{
    },
    mounted() {

    },
    data(){
        return {
            appointments:[],
            doctors:[],
            patients:[],
            base_url:base_url,
            addForm:{},
            editForm:{},
            form:{},
            Checked:'',
            searchTerm:'',
            addFormErrors:{},
            editFormErrors:{},
        }
    },
    methods:{
        fetchDoctors()
        {
            axios.get(base_url + 'api/doctors')
                .then(response => {
                    this.doctors = response.data.doctors;
                })
                .catch(error => {
                    swalHelper.errorWithMessage('no data loaded')
                })
        },
        fetchPatients()
        {
            axios.get(base_url + 'api/patients')
                .then(response => {
                    this.patients = response.data.patients;
                })
                .catch(error => {
                    swalHelper.errorWithMessage('no albums loaded')
                })
        },
        fetchAppointments()
        {
            axios.get(base_url + 'api/appointments')
                .then(response => {
                    this.appointments = response.data.appointments;
                })
                .catch(error => {
                    swalHelper.errorWithMessage('no albums loaded')
                })
        },
        storeMethod(FormData)
        {
            axios.post(base_url + 'api/appointments/' , FormData)
                .then(response => {
                    response.data.patient ? this.appointments.push(response.data.patient) : null;
                    this.addFormErrors = response.data.errors;
                })
                .catch(error => {
                    this.addFormErrors = error.response.data.errors;
                })
        },
        editMethod(data)
        {
            this.editForm = data;
            this.editFormErrors = null;
        },
        updateMethod(FormData)
        {
            axios.put(base_url + 'api/appointments/' + FormData.id, FormData)
                .then(response => {
                    if (response.data){
                        Object.assign(FormData, response.data.patient);
                    }
                })
                .catch(error => {
                    this.editFormErrors = error.response.data.errors;
                    this.fetchDoctors();
                })
        },
        deleteMethod(id)
        {
            if (id) {
                Swal.fire({
                    title: 'Are you sure?',
                    text: 'You will not be able to recover this setting!',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.delete(base_url+'api/appointments/'+id)
                            .then(response => {
                                this.appointments = this.appointments.filter(appointment => {
                                    return appointment.id !== id;
                                });
                                this.fetchPatients();
                                this.fetchAppointments();
                                SwalHelper.successWithMessage(response.data.message);
                            })
                            .catch(error => {
                                Notification.errorWithMessage(error.response.data.message);
                            })
                    }
                });
            }
        },
    },
    computed:{
        AppointmentsSearchFilter(){
            if (!this.searchTerm){
                return this.appointments;
            }
            else {
                return this.appointments.filter(appointment => {
                    return appointment.number.toLowerCase().includes(this.searchTerm.toLowerCase());
                })
            }
        }
    },
    watch:{

    }
}
</script>

<style scoped>

</style>
