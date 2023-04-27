<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">

                    <h4 class="card-title">Medecin Table:</h4>
                    <div class="row">
                        <div class="col-10">
                            <input type="text" v-model="searchTerm" placeholder="Recherche" class="input-group form-control"/>
                        </div>
                        <div class="col-2">
                            <!-- Button trigger modal -->
                            <div class="modal" id="addModel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-lg">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Medecin :</h5>
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
                                                                        Specialite:
                                                                    </label>
                                                                    <select class="input-group form-control" required v-model="addForm.speciality">
                                                                        <option class="btn btn-success badge" value="Nephrologists">
                                                                            Nephrologists
                                                                        </option>
                                                                        <option class="btn btn-success badge" value="Obstetricians and Gynecologists">
                                                                            Obstetricians and Gynecologists
                                                                        </option>
                                                                        <option class="btn btn-success badge" value="Osteopaths">
                                                                            Osteopaths
                                                                        </option>
                                                                        <option class="btn btn-success badge" value="Psychiatrists">
                                                                            Psychiatrists
                                                                        </option>
                                                                        <option class="btn btn-success badge" value="Podiatrists">
                                                                            Podiatrists
                                                                        </option>
                                                                        <option class="btn btn-success badge" value="Physiatrists">
                                                                            Physiatrists
                                                                        </option>
                                                                        <option class="btn btn-success badge" value="Urologists">
                                                                            Urologists
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
                                                                        Telephone:
                                                                    </label>
                                                                    <input v-model="addForm.telephone" class="form-control" type="number" placeholder="Please Enter telephone:" maxlength="20" required>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-12 pt-2">
                                                                    <label class="form-label" title="title">
                                                                        Date Embauche:
                                                                    </label>
                                                                    <input v-model="addForm.date_hired" class="form-control" type="date" required>
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
                            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModel">Nouveau Medecin</button>
                        </div>
                    </div>
                    <p class="card-title-desc">

                    </p>

                    <table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                        <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Code</th>
                            <th>Telephone</th>
                            <th>Date</th>
                            <th>Specialite</th>
                            <th>Action</th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr v-for="(doctor, index) in DoctorsSearchFilter" :key="doctor.id">
                            <td> {{ doctor.name }}</td>
                            <td> {{ doctor.code }}</td>
                            <td> {{ doctor.telephone }}</td>
                            <td> {{ doctor.date_hired }}</td>
                            <td> {{ doctor.speciality }}</td>
                            <td>
                                <!-- Button trigger modal -->
                                <button @click="editMethod(doctor)" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModel">Modifier</button>
                                <button @click="deleteMethod(doctor.id)" class="btn btn-warning"> Supprimer </button>

                            </td>
                        </tr>
                        </tbody>
                    </table>

<!--                    Edit Modal Album     -->
                    <div class="modal" id="editModel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Edit Medecin :</h5>
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
                                                            <input v-model="editForm.name" class="form-control" type="text" placeholder="Please Enter Nane:" maxlength="200" required>
                                                        </div>
                                                        <div class="col-4">
                                                            <label class="form-label" title="title">
                                                                Specialite:
                                                            </label>
                                                            <select class="input-group form-control" required v-model="editForm.speciality">
                                                                <option class="btn btn-success badge" value="Nephrologists">
                                                                    Nephrologists
                                                                </option>
                                                                <option class="btn btn-success badge" value="Obstetricians and Gynecologists">
                                                                    Obstetricians and Gynecologists
                                                                </option>
                                                                <option class="btn btn-success badge" value="Osteopaths">
                                                                    Osteopaths
                                                                </option>
                                                                <option class="btn btn-success badge" value="Psychiatrists">
                                                                    Psychiatrists
                                                                </option>
                                                                <option class="btn btn-success badge" value="Podiatrists">
                                                                    Podiatrists
                                                                </option>
                                                                <option class="btn btn-success badge" value="Physiatrists">
                                                                    Physiatrists
                                                                </option>
                                                                <option class="btn btn-success badge" value="Urologists">
                                                                    Urologists
                                                                </option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-12 pt-2">
                                                            <label class="form-label" title="title">
                                                                Code:
                                                            </label>
                                                            <input v-model="editForm.code" class="form-control" type="text" placeholder="Please Enter Code:" maxlength="20" required>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-12 pt-2">
                                                            <label class="form-label" title="title">
                                                                Telephone:
                                                            </label>
                                                            <input v-model="editForm.telephone" class="form-control" type="number" placeholder="Please Enter telephone:" maxlength="15" required>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-12 pt-2">
                                                            <label class="form-label" title="title">
                                                                Date Embauche:
                                                            </label>
                                                            <input v-model="editForm.date_hired" class="form-control" type="date">
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
    name: "DoctorComponent",

    created() {
        this.fetchDoctors();
    },
    components:{
    },
    mounted() {

    },
    data(){
        return {
            doctors:[],
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
        storeMethod(FormData)
        {
            axios.post(base_url + 'api/doctors/' , FormData)
                .then(response => {
                    response.data.doctor ? this.doctors.push(response.data.doctor) : null;
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
            axios.put(base_url + 'api/doctors/' + FormData.id, FormData)
                .then(response => {
                    if (response.data){
                        Object.assign(FormData, response.data.doctor);
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
                        axios.delete(base_url+'api/doctors/'+id)
                            .then(response => {
                                this.doctors = this.doctors.filter(doctor => {
                                    return doctor.id !== id;
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
        DoctorsSearchFilter(){
            if (!this.searchTerm){
                return this.doctors;
            }
            else {
                return this.doctors.filter(doctor => {
                    return doctor.code.toLowerCase().includes(this.searchTerm.toLowerCase());
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
