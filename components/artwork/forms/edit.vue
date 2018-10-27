<template>
    <div v-if="show">
        <v-stepper v-model="step" vertical class="elevation-0 transparent">
            <v-stepper-step :complete="step > 1" step="1">
                Upload Photos
            </v-stepper-step>
            <!-- Photos Section -->
            <v-stepper-content step="1">
                <v-card v-if="pictures.length <= 0">
                    <v-card-text style="border: dashed grey;">
                        <v-container fluid fill-height justify-center @click="addphoto">
                            <div style="text-align: center;">
                                <v-icon size="80px">fas fa-camera-retro</v-icon> <br>
                                <span style="color: grey"><h3>Click to Add Photos</h3></span>
                                <span style="color: rgba(183, 181, 181, 1)"><h4>You can add up to 10 photos per artwork</h4></span>
                                <br>
                                <br>
                                <h4><span style="color: rgba(183, 181, 181, 1)">Need help on how to upload right image? </span> <a href="#">Click here</a></h4>
                            </div>
                        </v-container>
                    </v-card-text>
                </v-card>
                <v-card v-else>
                    <v-card-text>
                        <v-container fluid fill-height grid-list-xl>
                            <v-layout row wrap id="horizontal_scroll">
                                <div v-for="(item, index) in pictures" :key="index" class="pt-3">
                                    <v-flex xs1>
                                        <v-card height="145px" width="145px" class="grey lighten-3">
                                            <v-container fluid fill-height justify-center style="padding: 0">
                                                <img :src="item">  
                                                <v-btn fab absolute top right small @click="pictures.splice(index, 1)"><v-icon>fas fa-minus</v-icon></v-btn>
                                            </v-container>
                                        </v-card>
                                    </v-flex>
                                </div>
                                <div class="pt-3">
                                    <v-flex xs1 v-if="pictures.length < 10">
                                        <v-card height="145px" width="145px" style="border: 1px solid black">
                                            <v-container fluid fill-height justify-center @click="addphoto">
                                                <div style="text-align: center">
                                                    <v-icon size="50px">fas fa-camera-retro</v-icon><br>
                                                    <span style="color: grey"><h4>Add more Photos</h4></span>
                                                </div>
                                            </v-container>
                                        </v-card>
                                    </v-flex>
                                </div>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                </v-card>
                <input type="file" id="file" ref="file" style="display:none;" multiple accept=".jpeg, .jpg, .png" @change="uploadphoto">
                <v-btn class="_btn cyan" :dark="pictures.length >= 1" :disabled="pictures.length <= 0" @click="step = step + 1">Continue</v-btn> <v-btn class="_btn" outline to="/">Cancel</v-btn>
            </v-stepper-content>
            <!-- End Section -->
            <v-stepper-step :complete="step > 2" step="2">
                Provide artwork details
            </v-stepper-step>
            <!-- Artwork Detail Section -->
            <v-stepper-content step="2">
                <v-card>
                    <v-card-text class="pa-5">
                        <h2>Artwork Details</h2>
                        <v-container fill-height fluid grid-list-xl class="pl-5 pr-5">
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-text-field label="What are you selling? (Title)" hint="Title" v-model="title" :error-messages="titleErrors" @blur="$v.title.$touch()" @input="$v.title.$touch()"/>
                                </v-flex>   
                                <v-flex xs12>
                                    <v-text-field label="Price" prefix="$" type="number" v-model="price" :error-messages="priceErrors" @input="$v.price.$touch()" @blur="$v.price.$touch()"></v-text-field>
                                </v-flex>
                                <v-flex xs4>
                                    <v-text-field type="number" label="Year" mask="####" v-model="year" :error-messages="yearErrors" @input="$v.year.$touch()" @blur="$v.year.$touch()"></v-text-field>
                                </v-flex>
                                <v-flex xs8>
                                    <v-autocomplete label="Select Medium" append-icon="keyboard_arrow_down" :items="mediumList" v-model="medium" @change="$v.medium.$touch()" :error-messages="mediumErrors"></v-autocomplete>
                                </v-flex>
                                <v-flex xs12>
                                    <v-textarea label="Describe your item" v-model="description" :error-messages="descriptionErrors" @input="$v.description.$touch()" @blur="$v.description.$touch()"></v-textarea>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                </v-card>
                <v-btn class="_btn cyan" :dark="price != null ? true : false" @click="step = step + 1" :disabled="price != null ? false : true">Continue</v-btn>
                <v-btn class="_btn" outline @click="step = step - 1">Previous</v-btn>
            </v-stepper-content>
            <!-- End Section -->
            <v-stepper-step :complete="step > 3" step="3">
                Select Charity and Campaign
            </v-stepper-step>
            <v-stepper-content step="3">
                <v-card>
                    <v-card-text class="pa-5">
                        <h2>Charity Details</h2>
                        <v-container fluid fill-height grid-list-xl>
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-autocomplete label="Select Charity" v-model="charityId" :items="charityList" item-text="name" item-value="_id" append-icon="keyboard_arrow_down" @input="getcampaign" @change="getcampaign"></v-autocomplete>
                                </v-flex>
                                <v-flex xs12>
                                    <v-autocomplete label="Select Campaign" :items="campaignList" item-text="name" item-value="_id" append-icon="keyboard_arrow_down" :disabled="campaignList.length <= 0" v-model="campaignId" @change="$v.campaignId.$touch()" :error-messages="campaignIdErrors"></v-autocomplete>
                                </v-flex>
                                <v-flex xs12>
                                    <v-layout row wrap>
                                        <v-flex xs6>
                                            <h4>How much do you want to donate?</h4>
                                        </v-flex>
                                        <v-flex xs6>
                                            <div style="text-align: right">
                                               <h3 style="color: cyan"><money-comp :item="pledgeAmount"/></h3> 
                                            </div>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                                <v-flex xs12>
                                    <v-slider :min="20" :max="100" thumb-label="always" v-model="pledge"></v-slider>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field label="Auction Duration (days)" type="number" v-model="auctionDuration" :error-messages="auctionDurationErrors" @input="$v.auctionDuration.$touch()" @blur="$v.auctionDuration.$touch()"></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                </v-card>
                <v-btn class="_btn cyan" dark @click="step = step + 1">Continue</v-btn>
                <v-btn class="_btn" outline @click="step = step - 1">Previous</v-btn>
            </v-stepper-content>
            <v-stepper-step :complete="step > 4" step="4">
                Shipping Details
            </v-stepper-step>
            <v-stepper-content step="4">
                <v-container fill-height fluid grid-list-xl style="padding: 0">
                    <v-layout row wrap>
                        <v-flex xs12>
                            <v-card>
                                <v-card-text class="pa-5">
                                    <h3>Artwork Dimension</h3>
                                    <v-container fluid fill-height grid-list-xl class="pt-5 pl-5 pr-5">
                                        <v-layout row wrap>
                                            <v-flex xs3>
                                                <v-text-field label="Length" v-model="length" :error-messages="lengthErrors" @input="$v.length.$touch()" @blur="$v.length.$touch()"></v-text-field>
                                            </v-flex>
                                            <v-flex xs3>
                                                <v-text-field label="Width" v-model="width" :error-messages="widthErrors" @input="$v.width.$touch()" @blur="$v.width.$touch()"></v-text-field>
                                            </v-flex>
                                            <v-flex xs3>
                                                <v-text-field label="Height" v-model="height" :error-messages="heightErrors" @input="$v.height.$touch()" @blur="$v.height.$touch()"></v-text-field>
                                            </v-flex>
                                            <v-flex xs3>
                                                <v-select label="Unit distance" v-model="distanceUnit" :items="distanceUnitList" @input="$v.distanceUnit.$touch()" @change="$v.distanceUnit.$touch()" :error-messages="distanceUnitErrors" append-icon="keyboard_arrow_down"></v-select>
                                            </v-flex>
                                            <v-flex xs9>
                                                <v-text-field label="Weight" v-model="weight" :error-messages="weigthErrors" @input="$v.weight.$touch()" @blur="$v.weight.$touch()"></v-text-field>
                                            </v-flex>
                                            <v-flex xs3>
                                                <v-select label="Weight Unit" append-icon="keyboard_arrow_down" :items="weightUnitList" v-model="weightUnit" :error-messages="weightUnitErrors" @change="$v.weightUnit.$touch()"></v-select>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </v-card-text>
                            </v-card>
                        </v-flex>
                        <v-flex xs12>
                            <v-card>
                                <v-card-text class="pa-5">
                                    <span style="float: left"><h2>Shipping Details</h2></span> <span style="float: right; color: cyan"><a @click="getaddress">Use profile address</a></span>
                                    <v-container fill-height fluid class="pt-5 pl-5 pr-5">
                                        <v-layout row wrap>
                                            <v-flex xs6>
                                                <v-text-field label="Address 1" v-model="address1" :error-messages="address1Errors" @input="$v.address1.$touch()" @blur="$v.address1.$touch()"></v-text-field>
                                            </v-flex>
                                            <v-flex xs6>
                                                <v-text-field label="Address 2" v-model="address2"></v-text-field>
                                            </v-flex>
                                            <v-flex xs6>
                                                <v-text-field label="City" v-model="city" :error-messages="cityErrors" @input="$v.city.$touch()" @></v-text-field>
                                            </v-flex>
                                            <v-flex xs6>
                                                <v-text-field label="State" v-model="state" :error-messages="stateErrors" @input="$v.state.$touch()" @blur="$v.state.$touch()"></v-text-field>
                                            </v-flex>
                                            <v-flex xs6>
                                                <v-text-field label="Postal Code" v-model="postalCode" :error-messages="postalCodeErrors" @input="$v.postalCode.$touch()" @blur="$v.postalCode.$touch()"></v-text-field>
                                            </v-flex>
                                            <v-flex xs6>
                                                <v-autocomplete :items="countryList" label="Country" v-model="country" :error-messages="countryErrors" @change="$v.country.$touch()"></v-autocomplete>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </v-card-text>
                                <v-divider></v-divider>
                                <v-card-text>
                                    <div style="text-align: center">
                                        <v-btn class="_btn" outline block style="height: 75px; font-weight: 700" @click="step = step - 1">Previous</v-btn>
                                        <v-btn class="_btn black" style="height: 75px; font-weight: 700" :dark="!invalidform" :disabled="invalidform" block @click="submit">Update</v-btn>
                                    </div>
                                </v-card-text>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-stepper-content>
        </v-stepper>
    </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
import eventbus from '@/plugins/eventBus'
import { API_ROUTE } from '@/config/apiroutes'
import GET_CHARITIES from '@/graphql/charity/getcharities'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import MoneyComp from '@/components/helpers/moneyconversion'
import UPDATE_ARTWORK from '@/graphql/artwork/updateartwork'
import { GET_COUNTRY_LIST } from '@/helpers/helpers'

export default {
    props: {
        artwork: {
            type: Object
        }
    },
    mixins: [validationMixin],
    validations: {
        title: { required },
        price: { required },
        description: { required },
        year: { required },
        distanceUnit: { required },
        width: { required },
        length: { required },
        height: { required },
        medium: { required },
        campaignId: { required },
        auctionDuration: { required },
        address1: { required },
        city: { required },
        state: { required },
        postalCode: { required },
        country: { required },
        weight: { required },
        weightUnit: { required }
    },
    data: () => ({
        show: false,
        countryList: GET_COUNTRY_LIST(),
        yearMenu: false,
        step: 1,
        mediumList: ['Painting', 'Works on paper', 'Prints', 'Photographs', 'Sculpture', 'Miniatures', 'Others'],
        weightUnitList: ['lb', 'g', 'kg'],
        distanceUnitList: ['mm', 'cm', 'm', 'in', 'ft'],
        charityId: null,
        charityList: [],
        campaignList: [],
        title: null,
        pictures: [],
        price: null,
        description: null,
        year: null,
        distanceUnit: null,
        width: null,
        length: null,
        height: null,
        medium: null,
        campaignId: null,
        pledge: 20,
        auctionDuration: null,
        address1: null,
        address2: null,
        city: null,
        state: null,
        postalCode: null,
        country: null,
        weight: null,
        weightUnit: null,
        _id: null
    }),
    methods: {
        addphoto () {
            document.getElementById('file').click()
        },
        uploadphoto () {
            let file = this.$refs.file.files
            if(file) {
                this.triggerLoading()
                let len = file.length - 1
                let data = new FormData()
                for (len; len >= 0; len --) {
                    data.append('image', file[len])
                }
                axios.post(API_ROUTE + '/upload/bulk', data, {
                    headers: {
                        'Authorization' : 'Bearer ' + localStorage.getItem('token') 
                    }
                }).then(response => {
                    for (let i in response.data) {
                        this.pictures.push('http://' + response.data[i])
                    }
                    this.triggerLoading()
                })
            }
        },
        triggerLoading() {
            eventbus.$emit('loading')
        },
        getcampaign () {
            if(this.charityList.length >= 1) {
                let charity = this.charityList.find( x => { return x._id === this.charityId })
                this.campaignList = []
                charity.campaigns.forEach(x => {
                    this.campaignList.push(x)
                })
            }
        },
        triggerAlert(message, color, action) {
            eventbus.$emit('alert', {
                message,
                color,
                action
            })
        },
        loadStateToData () {
            return {
                _id: this._id,
                pictures: this.pictures,
                title: this.title,
                price: this.price,
                description: this.description,
                year: this.year,
                distanceUnit: this.distanceUnit,
                width: this.width,
                length: this.length,
                height: this.height,
                medium: this.medium,
                campaignId: this.campaignId,
                pledge: this.pledge,
                auctionDuration: this.auctionDuration,
                address1: this.address1,
                address2: this.address2,
                city: this.city,
                state: this.state,
                postalCode: this.postalCode,
                country: this.country,
                weight: this.weight,
                weightUnit: this.weightUnit
            }
        },
        async submit () {
            this.triggerLoading()
            this.$apollo.mutate({
                mutation: UPDATE_ARTWORK,
                variables: this.loadStateToData()
            })
            .then(res => {
                const { Model, Successful, Message } = res.data.updateartwork
                if(!Successful) {
                    this.triggerLoading()
                    this.triggerAlert(Message, 'red', 'close')
                } else {
                    this.triggerAlert(Message, 'green', 'check')
                    this.triggerLoading()
                    this.$router.push('/')
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        getaddress () {
            let profile = this.$store.state.profile.data
            this.address1 = profile.address1
            this.address2 = profile.address2
            this.city = profile.city
            this.state = profile.state
            this.postalCode = profile.postalCode
            this.country = profile.country
        },
        loadDataToState (val) {
           this._id = val._id
           this.title = val.title
           this.pictures = val.pictures
           this.description = val.description
           this.year = val.year
           this.price = val.price
           this.medium = val.medium
           this.length = val.length
           this.width = val.width
           this.height = val.height
           this.distanceUnit = val.distanceUnit
           this.charityId = val.charityId
           this.campaignId = val.campaignId
           this.pledge = val.pledge
           this.auctionDuration = val.auctionDuration
           this.address1 = val.address1
           this.address2 = val.address2
           this.city = val.city
           this.state = val.state
           this.postalCode = val.postalCode
           this.country = val.country
           this.weight = val.weight
           this.weightUnit = val.weightUnit
        }
    },
    apollo: {
        getcharities: {
            query: GET_CHARITIES,
            variables() {
                return {
                    filter: '{}',
                    sort: '{}',
                    limit: null,
                    skip: null
                }
            }
        }
    },
    watch: {
        getcharities: function (val) {
            if(val) {
                val.SearchItems.forEach(x => {
                    this.charityList.push(x)
                })
                this.show = true
                this.loadDataToState(this.artwork)
            }
        }
    },
    computed: {
        invalidform () {
            return this.$v.$invalid
        },
        titleErrors () {
            const errors = []
            if(!this.$v.title.$dirty) return errors
            !this.$v.title.required && errors.push('Title is required.')
            return errors
        },
        priceErrors () {
            const errors = []
            if(!this.$v.price.$dirty) return errors
            !this.$v.price.required && errors.push('Price is required.')
            return errors
        },
        descriptionErrors () {
            const errors = []
            if(!this.$v.description.$dirty) return errors
            !this.$v.description.required && errors.push('Description is required.')
            return errors
        },
        yearErrors () {
            const errors = []
            if(!this.$v.year.$dirty) return errors
            !this.$v.year.required && errors.push('Year is required.')
            return errors
        },
        distanceUnitErrors () {
            const errors = []
            if(!this.$v.distanceUnit.$dirty) return errors
            !this.$v.distanceUnit.required && errors.push('Distance Unit is required.')
            return errors
        },
        widthErrors () {
            const errors = []
            if(!this.$v.width.$dirty) return errors
            !this.$v.width.required && errors.push('Width is required.')
            return errors
        },
        lengthErrors () {
            const errors = []
            if(!this.$v.length.$dirty) return errors
            !this.$v.length.required && errors.push('Length is required.')
            return errors
        },
        heightErrors () {
            const errors = []
            if(!this.$v.height.$dirty) return errors
            !this.$v.height.required && errors.push('Height is required.')
            return errors
        },
        mediumErrors () {
            const errors = []
            if(!this.$v.medium.$dirty) return errors
            !this.$v.medium.required && errors.push('Medium is required.')
            return errors
        },
        campaignIdErrors () {
            const errors = []
            if(!this.$v.campaignId.$dirty) return errors
            !this.$v.campaignId.required && errors.push('Campaign is required.')
            return errors
        },
        auctionDurationErrors () {
            const errors = []
            if(!this.$v.auctionDuration.$dirty) return errors
            !this.$v.auctionDuration.required && errors.push('Auction Duration is required.')
            return errors
        },
        address1Errors () {
            const errors = []
            if(!this.$v.address1.$dirty) return errors
            !this.$v.address1.required && errors.push('Address 1 is required.')
            return errors
        },
        cityErrors () {
            const errors = []
            if(!this.$v.city.$dirty) return errors
            !this.$v.city.required && errors.push('City is required.')
            return errors
        },
        stateErrors () {
            const errors = []
            if(!this.$v.state.$dirty) return errors
            !this.$v.state.required && errors.push('State is required.')
            return errors
        },
        postalCodeErrors () {
            const errors = []
            if(!this.$v.postalCode.$dirty) return errors
            !this.$v.postalCode.required && errors.push('Postal Code is required.')
            return errors
        },
        countryErrors () {
            const errors = []
            if(!this.$v.country.$dirty) return errors
            !this.$v.country.required && errors.push('Country is required.')
            return errors
        },
        weigthErrors () {
            const errors = []
            if(!this.$v.weight.$dirty) return errors
            !this.$v.weight.required && errors.push('Weight is required.')
            return errors
        },
        weightUnitErrors () {
            const errors = []
            if(!this.$v.weightUnit.$dirty) return errors
            !this.$v.weightUnit.required && errors.push('Weight Unit is required.')
            return errors
        },
        pledgeAmount () {
            return this.price === null ? 0 : Math.ceil(this.price * (this.pledge / 100)) 
        }
    },
    components: {
        'money-comp': MoneyComp
    }
}
</script>


<style scoped>
    a {
        color: cyan;
        text-decoration: none;
    }
    #horizontal_scroll {
        width: 1550px;
        overflow-x: auto;
    }
    img {
       object-fit: contain;
       width: 100%;
       height: 100%;
    }
</style>

