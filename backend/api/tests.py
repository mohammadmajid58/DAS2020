from api.serializers import GradeSerializer
import json
from api.models import Grade
from rest_framework import status
from rest_framework.test import APITestCase


class ViewSetTestCase(APITestCase):

    def test_post_data(self):
        grade = [{"courseCode": "ORGCHEM", "matricNo": "2283853", "alphanum": "C2"}]
        response = self.client.post("/grades/", grade, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_data_stored(self):
        data = [{"courseCode": "INORG", "matricNo": "1234567", "alphanum": "B2"},
                {"courseCode": "PHYS", "matricNo": "2283653", "alphanum": "D2"}]
        serializer = GradeSerializer(data=data, many=True)
        if serializer.is_valid():
            serializer.save()
        grade = Grade.objects.filter(courseCode="INORG", matricNo="1234567", alphanum="B2").exists()
        self.assertTrue(grade)

    def test_get_object(self):
        Grade.objects.get_or_create(courseCode="INORG", matricNo="1234567", alphanum="B2")
        response = self.client.get('/grades/')
        response = response.content.decode('utf-8')
        response_dict = json.loads(response)
        self.assertEqual(response_dict, [{"courseCode": "INORG", "matricNo": "1234567", "alphanum": "B2"}])

    def test_duplicate_entries_not_created(self):
        Grade.objects.get_or_create(courseCode="PHYS", matricNo="1234387", alphanum="E2")
        grade = [{"courseCode": "PHYS", "matricNo": "1234387", "alphanum": "E2"}]
        response = self.client.post("/grades/", grade, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
