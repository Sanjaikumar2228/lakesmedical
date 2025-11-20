from rest_framework import generics
from .models import Patient
from .serializers import PatientSerializer

class PatientCreateView(generics.CreateAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer


class PatientUpdateView(generics.UpdateAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

    def get_serializer(self, *args, **kwargs):
        # Allow partial updates
        kwargs['partial'] = True
        return super().get_serializer(*args, **kwargs)

    def patch(self, request, *args, **kwargs):
        data = request.data.copy()

        # Combine month + year into single field
        month = data.get("medicareexpirymonth")
        year = data.get("medicareexpiryyear")

        if month and year:
            data["medicareexpiry"] = f"{month}/{year}"

        # Remove separate fields so serializer won't complain
        data.pop("medicareexpirymonth", None)
        data.pop("medicareexpiryyear", None)

        request._full_data = data  # override request data for serializer

        return super().patch(request, *args, **kwargs)
