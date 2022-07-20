from rest_framework import permissions
import datetime


class IsCreator(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        now = datetime.datetime.now()
        event_datetime = datetime.datetime.combine(obj.date, obj.time)

        if event_datetime < now:
            return False

        if request.user == obj.creator:
            return True

        return False
