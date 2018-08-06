<template>
    <v-stepper v-model="step" vertical class="elevation-0" style="background-color:hsl(0, 0%, 98%)">
        <v-stepper-step :complete="step > 1" step="1">
            Upload Photos
        </v-stepper-step>
        <v-stepper-content step="1">
            <v-card height="100%" class="pa-3">
                <v-card flat id="_picInsert" :height="260">
                    <v-container fluid fill-height justify-center>
                        <div style="color:grey; text-align: center;">
                            <v-icon :size="45">photo_camera</v-icon> <br>
                            Add Photos <br>
                            <i>You can add up 10 photos per artwork</i> <br> 
                            <br>
                            <br>
                            You need help to upload right image? <a>Click here</a>
                        </div>
                    </v-container>
                </v-card>
                <v-btn dark color="cyan ligthen-2" @click="step = step + 1" class="_btn">Continue</v-btn>
            </v-card>
        </v-stepper-content>
        <v-stepper-step :complete="step > 2" step="2">
            Provide artwork details
        </v-stepper-step>
        <v-stepper-content step="2">
            <v-card class="pa-4">
                <v-card-text>
                    <h2>Item Details</h2>
                    <v-container fluid fill-height grid-list-xl>
                        <v-layout row wrap>
                            <v-flex xs12>
                                <v-text-field label="What are you selling? (title)" v-model="title" />
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field prepend-inner-icon="attach_money" v-model="price" label="Price" type="number"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-select label="Select category" v-model="category" />
                            </v-flex>
                            <v-flex xs12>
                                <v-textarea label="Describe your item" v-model="description"></v-textarea>
                            </v-flex>
                            <v-flex xs4>
                                <v-select label="Year" v-model="year" :items="yearList" />
                            </v-flex>
                            <v-flex xs8>
                                <v-select label="Select medium" v-model="medium" />
                            </v-flex>
                            <v-flex xs4>
                                <v-text-field label="height" v-model="height" />
                            </v-flex>
                            <v-flex xs4>
                                <v-text-field label="width" v-model="width" />
                            </v-flex>
                            <v-flex xs4>
                                <v-select label="Measurement" v-model="measurement" />
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-btn class="_btn" dark color="cyan lighten-2" @click="goToStep3">Continue</v-btn>
                    <v-btn class="_btn" outline @click="step = step -1">Previous</v-btn>
                </v-card-actions>
            </v-card>
        </v-stepper-content>
        <v-stepper-step :complete="step > 3" step="3">
            Select charity and publish
        </v-stepper-step>
        <v-stepper-content step="3">
            <v-card class="pa-3">
                <v-card-text>
                    <h2>Select Chaity</h2>
                    <v-container fluid fill-height grid-list-xl>
                        <v-layout row wrap>
                            <v-flex xs12>
                                <v-select label="Charity" />
                            </v-flex>
                            <v-flex xs12>
                                <v-select label="Campaign" />
                            </v-flex>
                            <v-flex xs9>
                                <h3>How much do you want to donate?</h3>
                            </v-flex>
                            <v-flex xs3>
                                <h3 style="color: cyan">${{donationPrice}}</h3>
                            </v-flex>
                            <v-flex xs12>
                                <v-slider v-model="donation" thumb-label="always" min="20" @change="changeDonation"/>
                            </v-flex>
                            <v-flex xs12>
                                <v-select label="Auction Duration" :items="durationDate" v-model="duration" />
                            </v-flex>
                        </v-layout>            
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <div style="text-align: center">
                        <v-btn class="_btn" dark color="cyan lighten-1">Submit</v-btn>
                        <v-btn class="_btn" @click="step = step - 1" outline>Previous</v-btn>
                    </div>
                </v-card-actions>
            </v-card>
        </v-stepper-content>
    </v-stepper>
</template>

<script>
/* eslint-disable */
export default {
    data: () => ({
        step: 1,
        title: '',
        yearList: [''],
        year: '',
        description: '',
        price: '',
        category: '',
        measurement: '',
        width: '',
        height: '',
        donation: 20,
        donationPrice: '',
        durationDate: [],
        duration: ''
    }),
    methods: {
        getYearList() {
            const year = []
            var yearToday = new Date().getFullYear()
            year.push(yearToday)
            for(var i = 1; i<=50; i ++) {
                year.push(yearToday-i)
            }
            this.yearList = year;
        },
        changeDonation () {
            this.donationPrice = Math.floor(this.price * (this.donation/100))
        },
        goToStep3 () {
            this.step = this.step + 1
            this.changeDonation()
        },
        insertDurationDate () {
            for (var i = 1; i <= 30; i++) {
                this.durationDate.push(i)
            }
        }
    },
    mounted() {
        this.getYearList()
        this.insertDurationDate()
    }
}
</script>

<style scoped>
   #_picInsert {
       border: 1px dashed grey;
   }
   a {
       text-decoration: none;
       color: cyan;
   }
   ._btn {
       text-transform: none;
   }
</style>

