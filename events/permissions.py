from rest_framework import permissions

class IsCreator(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        
        if request.user == obj.creator:
            return True
    
        return False