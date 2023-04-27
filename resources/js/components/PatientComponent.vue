<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">

                    <h4 class="card-title">Patient Table:</h4>
                    <div class="row">
                        <div class="col-10">
                            <input type="text" v-model="searchTerm" placeholder="Recherche Code" class="input-group form-control"/>
                        </div>
                        <div class="col-2">
                            <!-- Button trigger modal -->
                            <div class="modal" id="addModel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-lg">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Patient :</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <form method="post" @click.prevent="">
                                                <div class="row">
                                                    <div class="col-12">
                                                        <div class="form-group">
                                                            <div class="row">
                                                                <div class="col-8">
                                                                    <label class="form-label" title="title">
                                                                        Nom:
                                                                    </label>
                                                                    <input v-model="addForm.name" class="form-control" type="text" placeholder="Please Enter Nom:" maxlength="200" required>
                                                                </div>
                                                                <div class="col-4">
                                                                    <label class="form-label" title="title">
                                                                        Sex:
                                                                    </label>
                                                                    <select class="input-group form-control" required v-model="addForm.sex">
                                                                        <option class="btn btn-success badge" value="male">
                                                                            Mâle
                                                                        </option>
                                                                        <option class="btn btn-success badge" value="female">
                                                                            Femelle
                                                                        </option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-12 pt-2">
                                                                    <label class="form-label" title="title">
                                                                        Code:
                                                                    </label>
                                                                    <input v-model="addForm.code" class="form-control" type="text" placeholder="Please Enter code:" maxlength="20" required>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-12 pt-2">
                                                                    <label class="form-label" title="title">
                                                                        Address:
                                                                    </label>
                                                                    <textarea v-model="addForm.address" class="form-control" type="text" placeholder="Please Enter Address:" rows="3" required></textarea>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-12 pt-2">
                                                                    <label class="form-label" title="title">
                                                                        Date Naissance:
                                                                    </label>
                                                                    <input v-model="addForm.date_of_birth" class="form-control" type="date" required>
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
                            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModel">Nouveau Patient</button>
                        </div>
                    </div>
                    <p class="card-title-desc">

                    </p>

                    <table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                        <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Code</th>
                            <th>Date Naissance</th>
                            <th>Sexe</th>
                            <th>Action</th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr v-for="(patient, index) in PatientsSearchFilter" :key="patient.id">
                            <td> {{ patient.name }}</td>
                            <td> {{ patient.code }}</td>
                            <td> {{ patient.date_of_birth }}</td>
                            <td>
                                <p class="font-monospace" v-if="patient.sex === 'male'">M</p>
                                <p class="font-monospace" v-else-if="patient.sex === 'female'">F</p>
                            </td>
                            <td>
                                <!-- Button trigger modal -->
                                <button @click="editMethod(patient)" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModel">Modifier</button>
                                <button @click="deleteMethod(patient.id)" class="btn btn-warning"> Supprimer </button>

                            </td>
                        </tr>
                        </tbody>
                    </table>

<!--                    Edit Modal Album     -->
                    <div class="modal" id="editModel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Edit Patient :</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form method="post" @click.prevent="">
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="form-group">
                                                    <div class="row">
                                                        <div class="col-8">
                                                            <label class="form-label" title="title">
                                                                Nom:
                                                            </label>
                                                            <input v-model="editForm.name" class="form-control" type="text" placeholder="Please Enter Nom:" maxlength="200" required>
                                                        </div>
                                                        <div class="col-4">
                                                            <label class="form-label" title="title">
                                                                Sexe:
                                                            </label>
                                                            <select class="input-group form-control" required v-model="editForm.sex">
                                                                <option class="btn btn-success badge" value="male">
                                                                    Mâle
                                                                </option>
                                                                <option class="btn btn-success badge" value="female">
                                                                    Femelle
                                                                </option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-12 pt-2">
                                                            <label class="form-label" title="title">
                                                                Code:
                                                            </label>
                                                            <input v-model="editForm.code" class="form-control" type="text" placeholder="Please Enter code:" maxlength="20" required>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-12 pt-2">
                                                            <label class="form-label" title="title">
                                                                Address:
                                                            </label>
                                                            <textarea v-model="editForm.address" class="form-control" type="text" placeholder="Please Enter Address:" rows="3" required></textarea>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-12 pt-2">
                                                            <label class="form-label" title="title">
                                                                Date Naissance:
                                                            </label>
                                                            <input v-model="editForm.date_of_birth" class="form-control" type="date" required>
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
    name: "PatientComponent",

    created() {
        this.fetchPatients();
    },
    components:{
    },
    mounted() {

    },
    data(){
        return {
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
        fetchPatients()
        {
            axios.get(base_url + 'api/patients')
                .then(response => {
                    this.patients = response.data.patients;
                })
                .catch(error => {
                    swalHelper.errorWithMessage('no data loaded')
                })
        },
        storeMethod(FormData)
        {
            axios.post(base_url + 'api/patients/' , FormData)
                .then(response => {
                    response.data.patient ? this.patients.push(response.data.patient) : null;
                    this.addFormErrors = response.data.errors;
                })
                .catch(error => {
                    this.addFormErrors = error.response.data.errors;
;                })
        },
        editMethod(data)
        {
            this.editForm = data;
            this.editFormErrors = null;
        },
        updateMethod(FormData)
        {
            axios.put(base_url + 'api/patients/' + FormData.id, FormData)
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
                        axios.delete(base_url+'api/patients/'+id)
                            .then(response => {
                                this.patients = this.patients.filter(patient => {
                                    return patient.id !== id;
                                });
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
        PatientsSearchFilter(){
            if (!this.searchTerm){
                return this.patients;
            }
            else {
                return this.patients.filter(patient => {
                    return patient.code.toLowerCase().includes(this.searchTerm.toLowerCase());
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
