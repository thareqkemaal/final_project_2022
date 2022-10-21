import React from "react";
import { Accordion } from 'flowbite-react';
import { AccordionPanel } from "flowbite-react/lib/esm/components/Accordion/AccordionPanel";
import { AccordionTitle } from "flowbite-react/lib/esm/components/Accordion/AccordionTitle";

const BankInfo = (props) => {

    return (
        <div className="text-start my-4">
            <Accordion>
                <AccordionPanel>
                    <AccordionTitle>
                        Bank Negara Indonesia (BNI)
                    </AccordionTitle>
                    <Accordion.Content>
                        <ol>
                            <li className="flex">
                                <p>1.</p>
                                <p className="ml-2">Masukkan Kartu ATM BNI & PIN.</p>
                            </li>
                            <li className="flex">
                                <p>2.</p>
                                <p className="ml-2">Pilih menu Transaksi Lainnya {'>'} Transfer {'>'} ke Rekening BNI Virtual Account.</p>
                            </li>
                            <li className="flex">
                                <p>3.</p>
                                <p className="ml-2">Masukkan 5 angka kode perushaan untuk Medcare (10011) dan nomor HP yang kamu daftarkan di akun Medcare (contoh: 10011081234567890).</p>
                            </li>
                            <li className="flex">
                                <p>4.</p>
                                <p className="ml-2">Di halaman konfirmasi, pastikan detail pembayaran sudah sesuai seperti No. VA, Nama, Produk dan Total Tagihan.</p>
                            </li>
                            <li className="flex">
                                <p>5.</p>
                                <p className="ml-2">Pastikan nama kamu dan Total tagihannya benar.</p>
                            </li>
                            <li className="flex">
                                <p>6.</p>
                                <p className="ml-2">Jika sudah benar, klik Ya.</p>
                            </li>
                            <li className="flex">
                                <p>7.</p>
                                <p className="ml-2">Simpan struk transaksi sebagai bukti pembayaran.</p>
                            </li>
                        </ol>
                    </Accordion.Content>
                </AccordionPanel>
                <AccordionPanel>
                    <AccordionTitle>
                        Bank Central Asia (BCA)
                    </AccordionTitle>
                    <Accordion.Content>
                        <ol>
                            <li className="flex">
                                <p>1.</p>
                                <p className="ml-2">Masukkan Kartu ATM BCA & PIN.</p>
                            </li>
                            <li className="flex">
                                <p>2.</p>
                                <p className="ml-2">Pilih menu Transaksi Lainnya {'>'} Transfer {'>'} ke Rekening BCA Virtual Account.</p>
                            </li>
                            <li className="flex">
                                <p>3.</p>
                                <p className="ml-2">Masukkan 5 angka kode perushaan untuk Medcare (10011) dan nomor HP yang kamu daftarkan di akun Medcare (contoh: 10011081234567890).</p>
                            </li>
                            <li className="flex">
                                <p>4.</p>
                                <p className="ml-2">Di halaman konfirmasi, pastikan detail pembayaran sudah sesuai seperti No. VA, Nama, Produk dan Total Tagihan.</p>
                            </li>
                            <li className="flex">
                                <p>5.</p>
                                <p className="ml-2">Pastikan nama kamu dan Total tagihannya benar.</p>
                            </li>
                            <li className="flex">
                                <p>6.</p>
                                <p className="ml-2">Jika sudah benar, klik Ya.</p>
                            </li>
                            <li className="flex">
                                <p>7.</p>
                                <p className="ml-2">Simpan struk transaksi sebagai bukti pembayaran.</p>
                            </li>
                        </ol>
                    </Accordion.Content>
                </AccordionPanel>
                <AccordionPanel>
                    <AccordionTitle>
                        Bank Rakyat Indonesia (BRI)
                    </AccordionTitle>
                    <Accordion.Content>
                        <ol>
                            <li className="flex">
                                <p>1.</p>
                                <p className="ml-2">Masukkan Kartu ATM BRI & PIN.</p>
                            </li>
                            <li className="flex">
                                <p>2.</p>
                                <p className="ml-2">Pilih menu Transaksi Lainnya {'>'} Transfer {'>'} ke Rekening BRI Virtual Account.</p>
                            </li>
                            <li className="flex">
                                <p>3.</p>
                                <p className="ml-2">Masukkan 5 angka kode perushaan untuk Medcare (10011) dan nomor HP yang kamu daftarkan di akun Medcare (contoh: 10011081234567890).</p>
                            </li>
                            <li className="flex">
                                <p>4.</p>
                                <p className="ml-2">Di halaman konfirmasi, pastikan detail pembayaran sudah sesuai seperti No. VA, Nama, Produk dan Total Tagihan.</p>
                            </li>
                            <li className="flex">
                                <p>5.</p>
                                <p className="ml-2">Pastikan nama kamu dan Total tagihannya benar.</p>
                            </li>
                            <li className="flex">
                                <p>6.</p>
                                <p className="ml-2">Jika sudah benar, klik Ya.</p>
                            </li>
                            <li className="flex">
                                <p>7.</p>
                                <p className="ml-2">Simpan struk transaksi sebagai bukti pembayaran.</p>
                            </li>
                        </ol>
                    </Accordion.Content>
                </AccordionPanel>
            </Accordion>
        </div>
    )
};

export default BankInfo;