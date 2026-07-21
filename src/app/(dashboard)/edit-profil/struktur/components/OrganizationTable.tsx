"use client";

import Image from "next/image";
import { Pencil, Trash2, User } from "lucide-react";

import { OrganizationMember } from "../page";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  data: OrganizationMember[];
  loading: boolean;
  onEdit: (member: OrganizationMember) => void;
  onDelete: (member: OrganizationMember) => void;
}

export default function OrganizationTable({
  data,
  loading,
  onEdit,
  onDelete,
}: Props) {
  if (loading) {
    return (
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Foto</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Jabatan</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell colSpan={6}>
                  <div className="h-12 animate-pulse rounded bg-muted" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="rounded-xl border py-16 text-center">
        <User className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />

        <h3 className="font-semibold">
          Belum ada data
        </h3>

        <p className="text-sm text-muted-foreground mt-2">
          Silakan tambahkan anggota organisasi.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-background">
      <Table>

        <TableHeader>

          <TableRow>

            <TableHead className="w-[80px]">
              Foto
            </TableHead>

            <TableHead>
              Nama
            </TableHead>

            <TableHead>
              Jabatan
            </TableHead>

            <TableHead>
              Kategori
            </TableHead>

            <TableHead>
              Status
            </TableHead>

            <TableHead className="text-right">
              Aksi
            </TableHead>

          </TableRow>

        </TableHeader>

        <TableBody>

          {data.map((member) => (

            <TableRow key={member.id}>

              <TableCell>

                {member.image ? (

                  <Image
                    src={member.image}
                    alt={member.name}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover border"
                  />

                ) : (

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <User className="h-6 w-6 text-muted-foreground" />
                  </div>

                )}

              </TableCell>

              <TableCell>

                <div className="font-medium">
                  {member.name}
                </div>

                {member.nip && (
                  <div className="text-xs text-muted-foreground">
                    {member.nip}
                  </div>
                )}

              </TableCell>

              <TableCell>
                {member.position}
              </TableCell>

              <TableCell>

                <Badge variant="secondary">
                  {member.category}
                </Badge>

              </TableCell>

              <TableCell>

                {member.is_active ? (
                  <Badge className="bg-green-600 hover:bg-green-600">
                    Aktif
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    Non Aktif
                  </Badge>
                )}

              </TableCell>

              <TableCell>

                <div className="flex justify-end gap-2">

                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => onEdit(member)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>

                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => onDelete(member)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>

                </div>

              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>
    </div>
  );
}