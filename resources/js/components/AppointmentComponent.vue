<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">

                    <h4 class="card-title">RDVs Table:</h4>
                    <div class="row">
                        <div class="col-9">
                            <input type="text" v-model="searchTerm" placeholder="Recherche Numéro" class="input-group form-control"/>
                        </div>
                        <div class="col-3">
                            <!-- Button trigger modal -->
                            <div class="modal" id="addModel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-lg">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">RDV :</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <form method="post" @click.prevent="">
                                                <div class="row">
                                                    <div class="col-12">
                                                        <div class="form-group">
                                                            <div class="row">
                                                                <div class="col-6">
                                                                    <label class="form-label" title="title">
                                                                        Numéro RDV:
                                                                    </label>
                                                                    <input v-model="addForm.number" class="form-control" type="number" required>
                                                                </div>
                                                                <div class="col-6">
                                                                    <label class="form-label" title="title">
                                                                        Date:
                                                                    </label>
                                                                    <input v-model="addForm.date" class="form-control" type="date" required>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-10 pt-2">
                                                                    <label class="form-label" title="title">
                                                                        Code:
                                                                    </label>
                                                                    <input v-model="addForm.code" class="form-control" type="text" placeholder="Please Enter code:" maxlength="20" required>
                                                                </div>
                                                                <div class="col-2 pt-2">
                                                                    <label class="form-label" title="title">
                                                                        Heure:
                                                                    </label>
                                                                    <input v-model="addForm.time" class="form-control" type="number" required>
                                                                </div>
                                                            </div>
                                                            <div class="row pt-3">
                                                                <div class="col-12">
                                                                    <label class="form-label" title="title">
                                                                        Code Medecin:
                                                                    </label>
                                                                    <select class="input-group form-control" required v-model="addForm.doctor_code">
                                                                        <option v-for="doctor in doctors" :value="doctor.code">
                                                                            {{ doctor.code }} || {{ doctor.name }}
                                                                        </option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div class="row pt-3">
                                                                <div class="col-12">
                                                                    <label class="form-label" title="title">
                                                                        Code Patient:
                                                                    </label>
                                                                    <select class="input-group form-control" required v-model="addForm.patient_code">
                                                                        <option v-for="patient in patients" :value="patient.code">
                                                                            {{ patient.code }} || {{ patient.name }}
                                                                        </option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                            <div class="col-12" v-if="addFormErrors">
                                                <p class="text-danger" v-for="error in addFormErrors">{{ error }}</p>
                                            </div>
                                            <div class="col-12 dropzone-previews">
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button @click="storeMethod(addForm)" type="button" class="btn btn-primary">Add</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModel">Nouveau Appointment</button>
                        </div>
                    </div>
                    <p class="card-title-desc">

                    </p>

                    <table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                        <thead>
                        <tr>
                            <th>Numero</th>
                            <th>Date</th>
                            <th>Heure</th>
                            <th>Medecin</th>
                            <th>Patient</th>
                            <th>Action</th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr v-for="(appointment, index) in AppointmentsSearchFilter" :key="appointment.id">
                            <td> {{ appointment.number }}</td>
                            <td> {{ appointment.date }}</td>
                            <td> {{ appointment.time }}</td>
                            <td> {{ appointment.doctor_code }}</td>
                            <td> {{ appointment.patient_code }}</td>
                            <td>
                                <!-- Button trigger modal -->
                                <button @click="editMethod(appointment)" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModel">Modifier</button>
                                <button @click="deleteMethod(appointment.id)" class="btn btn-warning"> Supprimer </button>

                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <!--                    Edit Modal Album     -->
                    <div class="modal" id="editModel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Edit Appointment :</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form method="post" @click.prevent="">
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="form-group">
                                                    <div class="row">
                                                        <div class="col-6">
                                                            <label class="form-label" title="title">
                                                                Numéro RDV:
                                                            </label>
                                                            <input v-model="editForm.number" class="form-control" type="number" required>
                                                        </div>
                                                        <div class="col-6">
                                                            <label class="form-label" title="title">
                                                                Date:
                                                            </label>
                                                            <input v-model="editForm.date" class="form-control" type="date" required>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-10 pt-2">
                                                            <label class="form-label" title="title">
                                                                Code:
                                                            </label>
                                                            <input v-model="editForm.code" class="form-control" type="text" placeholder="Please Enter code:" maxlength="20" required>
                                                        </div>
                                                        <div class="col-2 pt-2">
                                                            <label class="form-label" title="title">
                                                                Heure:
                                                            </label>
                                                            <input v-model="editForm.time" class="form-control" type="number" required>
                                                        </div>
                                                    </div>
                                                    <div class="row pt-3">
                                                        <div class="col-12">
                                                            <label class="form-label" title="title">
                                                                Code Medecin:
                                                            </label>
                                                            <select class="input-group form-control" required v-model="editForm.doctor_code">
                                                                <option v-for="doctor in doctors" :value="doctor.code">
                                                                    {{ doctor.code }} || {{ doctor.name }}
                                                                </option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="row pt-3">
                                                        <div class="col-12">
                                                            <label class="form-label" title="title">
                                                                Code Patient:
                                                            </label>
                                                            <select class="input-group form-control" required v-model="editForm.patient_code">
                                                                <option v-for="patient in patients" :value="patient.code">
                                                                    {{ patient.code }} || {{ patient.name }}
                                                                </option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <div class="col-12" v-if="editFormErrors">
                                        <p class="text-danger" v-for="error in editFormErrors">{{ error }}</p>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button @click="updateMethod(editForm)" type="button" class="btn btn-primary">Update</button>
                                </div>
                            </div>
                        </div>
                    </div>

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
            axios.get(base_url + 'api/patientsnoappointments')
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
