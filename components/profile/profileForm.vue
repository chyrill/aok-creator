<template>
    <div>
        <div class="main_container">
            <div class="banner">
                <v-card :height="285" :class="profileBanner == null ? 'pa-3': ''"> 
                    <div v-if="profileBanner === null">
                        <v-card flat id="_picInsert" :height="255">
                            <v-container v-if="!loading" fluid fill-height justify-center @click="uploadPhoto">       
                                <div style="text-align: center;">                                            
                                    <v-icon :size="45">photo_size_select_actual</v-icon> <br>
                                    <p style="color: grey">click to add cover photo</p>                                             
                                </div>
                            </v-container>
                            <v-container v-if="loading" fluid fill-height justify-center>
                                <v-progress-circular indeterminate></v-progress-circular>
                            </v-container>
                            
                        </v-card>
                    </div>
                    <div v-else-if="profileBanner !== null">
                        <img :src="profileBanner" id="_banner" />
                        <v-btn fab color="black" small top right absolute dark @click="uploadPhoto"><v-icon>edit</v-icon></v-btn>
                    </div>
                </v-card>
            </div>
            <input type="file" name="image" accept=".jpg, .jpeg, .png" ref="banner" id="bannerProfile"  @change="sendUploadPhoto" style="display: none;" />
            <input type="file" name="image" accept=".jpg, .jpeg, .png" ref="dp" id="dp" @change="sendUploadDP" style="display:none;" />
            <div class="profile">
                <v-card class="pa-3">
                    <v-card-text>
                        <v-container fluid fill-height grid-list-xl>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-avatar :size="110"><v-btn fab small right bottom icon absolute color="black" dark @click="uploadDp"><v-icon>edit</v-icon></v-btn><img :src=" displayPicture === null ? '/icon_avatar.png': displayPicture" /></v-avatar>
                                </v-flex>                               
                                <v-flex xs6>
                                    <v-text-field label="First Name" v-model="firstName"  :error-messages="firstNameErrors" @input="$v.firstName.$touch()" @blur="$v.firstName.$touch()"/>
                                </v-flex>
                                <v-flex xs6>
                                    <v-text-field label="Last Name" v-model="lastName" :error-messages="lastNameErrors" @input="$v.lastName.$touch()" @blur="$v.lastName.$touch()"></v-text-field>
                                </v-flex>
                                <v-flex xs6>
                                    <v-text-field label="Alias" v-model="alias"></v-text-field>
                                </v-flex>
                                <v-flex xs6>
                                    <v-text-field label="What do you do" v-model="category" :error-messages="categoryErrors" @blur="$v.category.$touch()" @input="$v.category.$touch()"></v-text-field>
                                </v-flex>
                                <v-flex xs6>
                                    <v-menu ref="menu"
                                    :close-on-content-click="false"
                                    v-model="menu"
                                    :nudge-right="40"
                                    lazy
                                    transition="scale-transition"
                                    offset-y
                                    min-width="290px"
                                    full-width>
                                        <v-text-field v-model="birthdate" slot="activator" label="Birthdate" readonl></v-text-field>
                                        <v-date-picker v-model="birthdate" no-title scrollable>
                                            <v-spacer></v-spacer>
                                            <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                                            <v-btn flat color="primary" @click="$refs.menu.save(birthdate)">OK</v-btn>
                                        </v-date-picker>
                                    </v-menu>
                                </v-flex>
                                <v-flex xs6>
                                    <v-select label="Gender" v-model="gender" :items="genderItems" :error-messages="genderErrors" @change="$v.gender.$touch()" @blur="$v.gender.$touch()"/>
                                </v-flex>
                                <v-flex xs6>
                                    <v-text-field label="Address1" v-model="address1"></v-text-field>
                                </v-flex>
                                <v-flex xs6>
                                    <v-text-field label="Address 2" v-model="address2"></v-text-field>
                                </v-flex>
                                <v-flex xs6>
                                    <v-text-field label="City" v-model="city" :error-messages="cityErrors" @input="$v.city.$touch()" @blur="$v.city.$touch()" />
                                </v-flex>
                                <v-flex xs6>
                                    <v-text-field label="State" v-model="state" />
                                </v-flex>
                                <v-flex xs6>
                                    <v-text-field label="Postal Code" v-model="postalCode" />
                                </v-flex>
                                <v-flex xs6>
                                    <v-select autocomplete label="country" :items="countryList" :error-messages="countryErrors" v-model="country"/>
                                </v-flex>
                                
                                <v-flex xs12>
                                    <v-textarea label="Describe yourself" v-model="description" :error-messages="descriptionError" @input="$v.description.$touch()" @blur="$v.description.$touch()"/>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                </v-card>
            </div>
            <div id="submit">
                <v-card>
                    <v-container justify-center fluid fill-height>
                        <v-btn flat outline class="_btn" :disabled="apolloLoading" to="/">Cancel</v-btn>
                        <v-btn color="black" :dark="!apolloLoading && !$v.$invalid" :disabled="apolloLoading || $v.$invalid" class="_btn" @click="submitUpdate"><v-progress-circular v-if="apolloLoading" indeterminate :size="20"></v-progress-circular> <span v-else>Save Changes</span></v-btn>
                    </v-container>
                </v-card>
            </div>
        </div>
    </div>
</template>


<script>
/* eslint-disable */
import {validationMixin}  from 'vuelidate';
import { required } from 'vuelidate/lib/validators'
import axios from 'axios'
import UPDATE_PROFILE_MUTATION from '@/graphql/userprofile/updateprofile'
import EventBus from '@/plugins/eventBus'
import { API_ROUTE } from '@/config/apiroutes'
import { GET_COUNTRY_LIST } from '@/helpers/helpers'

export default {
    mixins: [validationMixin],
    validations: {
        firstName: { required },
        lastName: {required},
        category: {required},
        birthdate: {required},
        gender: { required },
        country: { required},
        city: {required},
        description: {required}
    },
    data: () => ({
        firstName: '',
        lastName: '',
        alias: '',
        category: '',
        menu: false,
        birthdate: null,
        genderItems: ['male' , 'female'],
        gender: '',
        countryList: GET_COUNTRY_LIST(),
        country: '',
        city: '',
        description: '',
        profileBanner: '',
        loading: false,
        displayPicture: '',
        _id: null,
        apolloLoading: false,
        address1: null,
        address2: null,
        state: null,
        postalCode: null
    }),
    computed: {
        firstNameErrors () {
            const errors = []
            if(!this.$v.firstName.$dirty) return errors
            !this.$v.firstName.required && errors.push('First name is required')
            return errors
        },
        lastNameErrors () {
            const errors = []
            if(!this.$v.lastName.$dirty) return errors
            !this.$v.lastName.required && errors.push('Last name is required')
            return errors
        },
        categoryErrors () {
            const errors = [] 
            if(!this.$v.category.$dirty) return errors
            !this.$v.category.required && errors.push('This is required')
            return errors
        },
        genderErrors () {
            const errors = []
            if(!this.$v.gender.$dirty) return errors
            !this.$v.gender.required && errors.push('Gender is required') 
            return errors
        },
        countryErrors () {
            const errors = []
            if(!this.$v.country.$dirty) return errors
            !this.$v.country.required && errors.push('Country is required')
            return errors
        },
        cityErrors () {
            const errors = []
            if(!this.$v.city.$dirty) return errors
            !this.$v.city.required && errors.push('City is required')
            return errors
        },
        descriptionError () {
            const error = []
            if(!this.$v.description.$dirty) return error
            !this.$v.description.required && error.push('Description is required')
            return error
        }
    },
    methods : {
        loadStoreToState (data) {
            let date = null
            if(data.birthdate) {
                let month = new Date(data.birthdate).getMonth() + 1
                date = new Date(data.birthdate).getFullYear() + '-' + month + '-' + new Date(data.birthdate).getDate()  
            }
            this.postalCode = data.postalCode
            this.address1 = data.address1
            this.address2 = data.address2
            this.state = data.state
            this.lastName = data.lastName
            this.firstName = data.firstName
            this.gender = data.gender 
            this._id = data._id
            this.country = data.country
            this.city = data.city
            this.description = data.description
            this.category = data.category
            this.profileBanner = data.profileBanner
            this.alias = data.alias
            this.displayPicture = data.displayPicture
            this.birthdate = date
            this.$v.$reset()
            console.log(data.birthdate)
        },
        uploadPhoto () {
            document.getElementById('bannerProfile').click()
        },
        sendUploadPhoto (event) {
            var image = this.$refs.banner.files[0]
            if(image) {
                this.loading = true
                const formData = new FormData()
                formData.append('image', image)
                axios.post(API_ROUTE + '/upload/single', formData, {
                    headers: {
                        'Authorization' : 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(res => {
                    this.loading = !this.loading
                    this.profileBanner = 'http://' + res.data.data
                })
            }
        },
        sendUploadDP (event) {
            var image = this.$refs.dp.files[0]
            if(image) {
                this.loading = true
                const formData = new FormData()
                formData.append('image', image)
                axios.post(API_ROUTE + '/upload/single', formData, {
                    headers: {
                        'Authorization' : 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(res => {
                    this.loading = !this.loading
                    this.displayPicture = 'http://' + res.data.data
                })
            }
        },
        uploadDp () {
            document.getElementById('dp').click()
        },
        async submitUpdate() {
            this.apolloLoading = !this.apolloLoading

            try {
                var data = {
                    firstName: this.firstName,
                    lastName : this.lastName,
                    city: this.city,
                    country: this.country,
                    category: this.category,
                    profileBanner: this.profileBanner,
                    displayPicture: this.displayPicture,
                    alias: this.alias,
                    _id: this._id,
                    description: this.description,
                    birthdate: this.birthdate,
                    gender: this.gender,
                    address1: this.address1,
                    address2: this.address2,
                    state: this.state,
                    postalCode: this.postalCode
                }
                this.$apollo.mutate({
                    mutation: UPDATE_PROFILE_MUTATION,
                    variables: data
                }).then( response => {
                    this.apolloLoading = !this.apolloLoading
                    let { Model, Message, Successful } = response.data.updateprofile
                    if(!Successful) {
                        this.triggerAlert(Message, 'red', 'close')
                    }
                    this.triggerAlert(Message, 'green', 'check')
                    this.$store.commit('profile/set', Model)
                    this.$router.push('/')
                }).catch(err => {
                    this.triggerAlert(err.message, 'red', 'close')
                })
            }
            catch(e) {
                console.log(e)
            }
        },
        triggerAlert(message, color, action) {
            var data = {
                message : message,
                color: color,
                action: action
            }
            EventBus.$emit('alert', data)
        }
    },
    props: {
        profile: {
            type: Object
        }
    },
    watch: {
        profile: function(val) {
            if(val) {
                this.loadStoreToState(this.profile)
            }
        }
    }    
}
</script>

<style scoped>
    .main_container {
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: auto;
        grid-gap:20px;
    }
    #_picInsert {
        border: 1px dashed grey;
    }
    ._btn {
        text-transform: none;
    }
    #_banner {
        object-fit: cover;
        height: 285px;
        width: 100%;
    }
</style>


