"use client"

import { useState, useEffect, useMemo } from "react"
import { Search, Download, MoreHorizontal, Mail, Trash2, Edit, UserX, UserCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import {
  getAllUsers,
  getConsultRequestsByUserId,
  toggleUserActive,
  type User,
  type ConsultRequest,
  deleteUser,
  initDatabase,
} from "@/lib/database-service"
import { useToast } from "@/components/ui/use-toast"

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [userRequests, setUserRequests] = useState<ConsultRequest[]>([])
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Initialize database and load users
  useEffect(() => {
    const initAndLoad = async () => {
      if (typeof window !== "undefined") {
        try {
          initDatabase()
          const allUsers = getAllUsers()
          setUsers(allUsers)
        } catch (error) {
          console.error("Error loading users:", error)
        } finally {
          setIsLoading(false)
        }
      }
    }

    initAndLoad()
  }, [])

  // Filter users based on search term - memoized to prevent unnecessary recalculations
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      return (
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
  }, [users, searchTerm])

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers((prev) => {
      if (prev.includes(userId)) {
        return prev.filter((id) => id !== userId)
      } else {
        return [...prev, userId]
      }
    })
  }

  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(filteredUsers.map((u) => u.id))
    }
  }

  const handleViewUser = (user: User) => {
    setSelectedUser(user)
    // Load user's consult requests
    const requests = getConsultRequestsByUserId(user.id)
    setUserRequests(requests)
    setIsViewDialogOpen(true)
  }

  const handleToggleUserActive = (userId: string) => {
    try {
      const updatedUser = toggleUserActive(userId)
      if (updatedUser) {
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.id === userId ? { ...user, isActive: updatedUser.isActive } : user)),
        )

        if (selectedUser?.id === userId) {
          setSelectedUser({ ...selectedUser, isActive: updatedUser.isActive })
        }

        toast({
          title: updatedUser.isActive ? "User Activated" : "User Deactivated",
          description: `User ${updatedUser.email} has been ${updatedUser.isActive ? "activated" : "deactivated"}.`,
        })
      }
    } catch (error) {
      console.error("Error toggling user active status:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update user status.",
      })
    }
  }

  const handleDeleteUser = (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      const success = deleteUser(userId)
      if (success) {
        setUsers(getAllUsers())
        if (selectedUser?.id === userId) {
          setIsViewDialogOpen(false)
        }
        toast({
          title: "User Deleted",
          description: "User has been permanently removed.",
        })
      }
    }
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-[#00473e]">Users</h1>
          <p className="text-[#007d73]">Manage user accounts and information</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled={selectedUsers.length === 0}>
                <Mail className="mr-2 h-4 w-4" /> Email Selected
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" /> Export CSV
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search users..."
                  className="pl-9 w-full md:w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                      onCheckedChange={toggleSelectAll}
                      aria-label="Select all users"
                    />
                  </TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Registered</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      Loading users...
                    </TableCell>
                  </TableRow>
                ) : filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedUsers.includes(user.id)}
                          onCheckedChange={() => toggleUserSelection(user.id)}
                          aria-label={`Select ${user.firstName} ${user.lastName}`}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarFallback>
                              {user.firstName[0]}
                              {user.lastName[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {user.firstName} {user.lastName}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{formatDate(user.createdAt)}</TableCell>
                      <TableCell>{formatDate(user.updatedAt)}</TableCell>
                      <TableCell>
                        {user.isActive ? (
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800">Inactive</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleViewUser(user)}>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit User</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleToggleUserActive(user.id)}>
                              {user.isActive ? (
                                <>
                                  <UserX className="mr-2 h-4 w-4" /> Deactivate User
                                </>
                              ) : (
                                <>
                                  <UserCheck className="mr-2 h-4 w-4" /> Activate User
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteUser(user.id)} className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" /> Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-500">
              Showing {filteredUsers.length} of {users.length} users
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Details Dialog */}
      {selectedUser && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
            </DialogHeader>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-1 flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarFallback className="text-2xl">
                    {selectedUser.firstName[0]}
                    {selectedUser.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold text-center">
                  {selectedUser.firstName} {selectedUser.lastName}
                </h3>
                <p className="text-gray-500 text-center">{selectedUser.email}</p>
                {selectedUser.isActive ? (
                  <Badge className="mt-2 bg-green-100 text-green-800">Active</Badge>
                ) : (
                  <Badge className="mt-2 bg-red-100 text-red-800">Inactive</Badge>
                )}

                <div className="mt-4 w-full space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="mr-2 h-4 w-4" /> Send Message
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Edit className="mr-2 h-4 w-4" /> Edit User
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => handleToggleUserActive(selectedUser.id)}
                  >
                    {selectedUser.isActive ? (
                      <>
                        <UserX className="mr-2 h-4 w-4" /> Deactivate User
                      </>
                    ) : (
                      <>
                        <UserCheck className="mr-2 h-4 w-4" /> Activate User
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => {
                      handleDeleteUser(selectedUser.id)
                    }}
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Delete User
                  </Button>
                </div>
              </div>

              <div className="md:col-span-2">
                <Tabs defaultValue="info">
                  <TabsList className="mb-4">
                    <TabsTrigger value="info">User Info</TabsTrigger>
                    <TabsTrigger value="requests">Consultation Requests</TabsTrigger>
                  </TabsList>

                  <TabsContent value="info" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">First Name</p>
                        <p>{selectedUser.firstName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Last Name</p>
                        <p>{selectedUser.lastName}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p>{selectedUser.email}</p>
                    </div>

                    {selectedUser.phone && (
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p>{selectedUser.phone}</p>
                      </div>
                    )}

                    {selectedUser.dob && (
                      <div>
                        <p className="text-sm text-gray-500">Date of Birth</p>
                        <p>{selectedUser.dob}</p>
                      </div>
                    )}

                    <div>
                      <p className="text-sm text-gray-500">Registered</p>
                      <p>{formatDate(selectedUser.createdAt)}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Last Updated</p>
                      <p>{formatDate(selectedUser.updatedAt)}</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="requests" className="space-y-4">
                    {userRequests.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">No consultation requests found for this user</div>
                    ) : (
                      <div className="space-y-4">
                        {userRequests.map((request) => (
                          <div key={request.id} className="border rounded-lg p-4">
                            <div className="flex justify-between">
                              <div>
                                <Badge
                                  className={
                                    request.type === "consultation"
                                      ? "bg-blue-100 text-blue-800"
                                      : request.type === "medical-certificate"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-purple-100 text-purple-800"
                                  }
                                >
                                  {request.type.replace("-", " ")}
                                </Badge>
                                <p className="mt-2 font-medium">{request.reason}</p>
                              </div>
                              <div className="text-right">
                                <Badge
                                  className={
                                    request.status === "pending"
                                      ? "bg-amber-100 text-amber-800"
                                      : request.status === "completed"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                  }
                                >
                                  {request.status}
                                </Badge>
                                <p className="text-xs text-gray-500 mt-1">{formatDate(request.createdAt)}</p>
                              </div>
                            </div>
                            {request.completedAt && (
                              <p className="text-xs text-gray-500 mt-2">Completed: {formatDate(request.completedAt)}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
