<template>
    <div>
        <div class="main_container">
            <div class="banner">
                <v-card :height="285" class="pa-3">
                    <v-card flat id="_picInsert" height="100%">
                        <v-container fluid fill-height justify-center>       
                            <div style="text-align: center;">                                            
                                <v-icon :size="45">photo_size_select_actual</v-icon> <br>
                                <p style="color: grey">click to add cover photo</p>                                             
                            </div>
                        </v-container>
                    </v-card>
                </v-card>
            </div>
            <div class="profile">
                <v-card class="pa-3">
                    <v-card-text>
                        <v-container fluid fill-height grid-list-xl>
                            <v-layout row wrap>
                                <v-flex xs3>
                                    <v-avatar :size="110"><img src="/icon_avatar.png" /></v-avatar>
                                </v-flex>
                                <v-flex xs9>
                                    <div>
                                        <br>
                                        <br>
                                        <span style="color: grey">Add Profile Photo</span> 
                                    </div>
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
                                    <v-select label="country" :items="countryList" :error-messages="countryErrors" v-model="country"/>
                                </v-flex>
                                <v-flex xs6>
                                    <v-text-field label="City" v-model="city" :error-messages="cityErrors" @input="$v.city.$touch()" @blur="$v.city.$touch()" />
                                </v-flex>
                                <v-flex xs12>
                                    <v-textarea label="Describe yourself" v-model="description" />
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                </v-card>
            </div>
            <div id="submit">
                <v-card>
                    <v-container justify-center fluid fill-height>
                        <v-btn flat outline class="_btn">Cancel</v-btn>
                        <v-btn color="black" dark class="_btn">Save Changes</v-btn>
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

export default {
    mixins: [validationMixin],
    validations: {
        firstName: { required },
        lastName: {required},
        category: {required},
        birthdate: {required},
        gender: { required },
        country: { required},
        city: {required}
    },
    data: () => ({
        firstName: '',
        lastName: '',
        alias: '',
        category: '',
        menu: false,
        birthdate: '',
        genderItems: ['male' , 'female'],
        gender: '',
        countryList: [],
        country: '',
        city: ''
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
        }
    },
    methods : {
        getCountryList () {
            axios.get('https://restcountries.eu/rest/v2/all').then(response => {
                for(let i in response.data) {
                    this.countryList.push(response.data[i].name)
                } 
            })
        }
    },
    mounted() {
        this.getCountryList()
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
</style>


