from django.db import models


class Patient(models.Model):

    firstname = models.CharField(max_length=100, blank=True, null=True)
    surname = models.CharField(max_length=100, blank=True, null=True)
    dob = models.DateField(blank=True, null=True)

    title = models.CharField(max_length=100, blank=True, null=True)
    middlename = models.CharField(max_length=100, blank=True, null=True)
    preferredname = models.CharField(max_length=100, blank=True, null=True)

    homephone = models.CharField(max_length=10, blank=True, null=True)
    workphone = models.CharField(max_length=10, blank=True, null=True)
    mobilephone = models.CharField(max_length=10, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)

    address1 = models.CharField(max_length=100, blank=True, null=True)
    address2 = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    postcode = models.CharField(max_length=100, blank=True, null=True)

    postaladdress = models.CharField(max_length=100, blank=True, null=True)

    medicarenumber = models.CharField(max_length=10, blank=True, null=True)
    medicarelineno = models.CharField(max_length=100, blank=True, null=True)
    medicareexpiry = models.CharField(max_length=7, blank=True, null=True)

    postalcity = models.CharField(max_length=100, blank=True, null=True)
    postalpostcode = models.CharField(max_length=100, blank=True, null=True)
    pensioncode = models.CharField(max_length=100, blank=True, null=True)
    pensionno = models.CharField(max_length=100, blank=True, null=True)
    pensionexpiry = models.CharField(  max_length=100,blank=True, null=True)

    dvacode = models.CharField(max_length=100, blank=True, null=True)
    dvanumber = models.CharField(max_length=100, blank=True, null=True)
    

    def __str__(self):
        return self.firstname if self.firstname else "Patient"
